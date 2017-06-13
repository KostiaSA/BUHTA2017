import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as classNames from "classnames";

import {Component, IComponentRegistration, IEvent, IEventArgs, Компоненты_Списки} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {SplitPanelItem} from "./SplitPanelItem";
import {SnapGrid} from "../react/SnapGrid";
import {DraggableResizable} from "../react/DraggableResizable";
import {SyntheticEvent} from "react";
import {ComponentWrapper} from "../react/ComponentWrapper";
import GridApi = ag.grid.GridApi;
import ColumnApi = ag.grid.ColumnApi;
let SplitterLayout = require("react-splitter-layout").default;
import {AgGridReact} from "ag-grid-react";
import {DataTable} from "../data/DataTable";
import {DataColumn} from "../data/DataColumn";
import {DataRow} from "../data/DataRow";
import {AgGridColDef} from "../react/AgGridColDef";
import {isNumber, isString} from "util";
import {numberCompare} from "../util/numberCompare";
import {EmittedCode} from "../designer/EmittedCode";
import {PropertyEditor, Категория_События} from "../designer/property-editors/PropertyEditor";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Списки,
        componentClass: Grid,
        image: "vendor/fugue/icons/ui-scroll-pane-table.png",
        title: "Grid"
    }
}


export interface IRowFocusedEventArgs extends IEventArgs {
    sender: Grid;
    focusedRow: DataRow;
}

export interface IRowAddEditDeleteKeyPressEventArgs extends IEventArgs {
    sender: Grid;
    focusedRow: DataRow;
}

export interface IGridCellRendererArgs {
    column: DataColumn;
    row: DataRow;
    agGridParams: any;
}

export interface IGridCellRenderer {
    (args: IGridCellRendererArgs): string | JSX.Element;
}


export class Grid extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {


    getToolBoxLabel(): string {
        return __registerBuhtaComponent__().title || super.getToolBoxLabel();
    }

    getDesignerLabel(): string {
        return __registerBuhtaComponent__().title || super.getDesignerLabel();
    }

    getDesignerImage(): string {
        return __registerBuhtaComponent__().image || super.getDesignerImage();
    }

    getDesignerCategory(): string {
        return __registerBuhtaComponent__().category || super.getDesignerCategory();
    }


    //<editor-fold desc="---------- property: onRowFocused ----------">
    _onRowFocused: IEvent<IRowFocusedEventArgs>;
    get onRowFocused(): IEvent<IRowFocusedEventArgs> {
        return this._onRowFocused;
    }

    set onRowFocused(value: IEvent<IRowFocusedEventArgs>) {
        this._onRowFocused = value;
    }

    protected __getDefaultValue_onRowFocused(): IEvent<IRowFocusedEventArgs> {
        return undefined as any;
    }

    protected  __emitCode_onRowFocused(code: EmittedCode) {
        code.emitEventValue(this, "onRowFocused");
    }

    protected  __getPropertyEditor_onRowFocused(): PropertyEditor {
        let EventPropertyEditor = require("../../designer/property-editors/EventPropertyEditor").EventPropertyEditor;

        let pe = new EventPropertyEditor();
        pe.propertyName = "onRowFocused";
        pe.category = Категория_События;
        return pe;
    }

    //</editor-fold>


    dataSource: DataTable<DataColumn, DataRow>;


    focusedRowKeyDownHandler = (e:KeyboardEvent) => {
        //console.log("eGridCell key ==================", e.key);
        if (this.dataSource.onRowEditKeyPress && (e.key==="Enter" || e.key==="F4")) {
            let focusedRow = this.getFocusedRow();
            if (focusedRow && !focusedRow.__isFolder__()) {
                this.dataSource.fireEvent(this.dataSource.onRowEditKeyPress, {focusedRow: focusedRow});
            }
        }

    };

    async loadData() {
        if (!this.dataSource)
            return;

        let cols: AgGridColDef[] = [];
        let colIndex = -1;
        for (let dataColumn of this.dataSource.getColumns()) {
            if (!dataColumn.hidden) {
                colIndex++;
                //console.log("dataColumn=================", dataColumn);
                let agCol: any = {
                    // colId: "col0",
                    headerName: dataColumn.name,
                    field: dataColumn.name,
                    cellRenderer: (params: any) => {
                        return params.innerRenderer(params)
                    },
                    cellRendererParams: {
                        innerRenderer: (params: any) => {
                            params.eGridCell.onkeydown = this.focusedRowKeyDownHandler;

                            let row = params.data as DataRow;
                            let strToRender: string;
                            if (dataColumn.gridCellRenderer) {
                                let rendererResult = dataColumn.gridCellRenderer({
                                    column: dataColumn,
                                    row: row,
                                    agGridParams: params
                                });
                                if (isString(rendererResult))
                                    strToRender = rendererResult as any;
                                if ((rendererResult as any).$$typeof === Symbol.for("react.element")) {

                                    strToRender = ReactDOMServer.renderToStaticMarkup(rendererResult as any);
                                }
                                else
                                    strToRender = "error in gridCellRenderer!";

                            }
                            else {
                                strToRender = row.__getValue__(dataColumn.name);
                            }

                            // иконка только у первой колонки
                            if (row.__icon__ && params.column.colDef.cellRenderer === cols[0].cellRenderer) {
                                strToRender = ReactDOMServer.renderToStaticMarkup(
                                        <img src={row.__icon__}
                                             style={{paddingRight: 4}}/>
                                    ) + strToRender;
                            }
                            return strToRender;
                        }
                    }
                    //maxWidth: 300,
                    //cellStyle: {whiteSpace: "normal"},
                    //cellRendererFramework: AgGrid_CellRenderer,
                };
                cols.push(agCol);
            }
        }


        let rows = await this.dataSource.getRows();

        if (this.dataSource.treeView) {
            if (cols[0])
                cols[0].cellRenderer = "group";
            if (this.dataSource.parentIdColumn)
                this.createNodesFromParentKey(rows);
            else
                this.nodes = rows;
        }
        else {
            this.nodes = rows;
        }

        //console.log(".............................", cols, this.nodes);

        this.gridApi.setColumnDefs(cols);
        this.gridApi.setRowData(this.nodes);
        this.updateGridOptions();
        if (this.dataSource.sizeColumnsToFit)
            this.gridApi.sizeColumnsToFit();
        this.gridApi.doLayout();

    }

    gridApi: GridApi;
    gridColumnApi: ColumnApi;
    private gridRowData: any[] = [];


    gridReadyHandler = (event: { api: GridApi, columnApi: ColumnApi }) => {
        this.gridApi = event.api;
        this.gridColumnApi = event.columnApi;
        this.loadData();
        //this.comboGridApi.addEventListener()

        //this.comboGridApi.doLayout();
        //this.comboGridApi.sizeColumnsToFit();

        //console.log("gridReadyHandler==========================================================");
    };

    updateGridOptions() {
        if (this.gridApi) {
            let gridOptions = this.getGridOptions();
            this.gridApi.setHeaderHeight(gridOptions.headerHeight);
        }
    }

    getGridOptions(): any {
        let gridOptions = {
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true,
            getNodeChildDetails: this.getNodeChildDetails,
            rowHeight: 22,
            headerHeight: 22
        };

        if (this.dataSource && this.dataSource.rowHeight) {
            gridOptions.rowHeight = this.dataSource.rowHeight;
        }

        if (this.dataSource && this.dataSource.headerHeight) {
            gridOptions.headerHeight = this.dataSource.headerHeight;
        }

        if (this.dataSource && this.dataSource.hideColumnHeaders) {
            gridOptions.headerHeight = 0;
        }
        return gridOptions;
    }

    getFocusedRow(): DataRow {

        let focusedRowIndex = this.gridApi.getFocusedCell().rowIndex;
        let renderedRows = this.gridApi.getRenderedNodes();

        for (let row of renderedRows) {
            if (row.rowIndex === focusedRowIndex) {
                return row.data;
            }
        }
        return undefined as any;
    }

    //private agGridReactNative: HTMLElement;
    // ------------------------------ getReactElement ------------------------------
    getReactElement(index?: number | string): JSX.Element | null {
        //console.log("Grid-getReactElement()", this.enabled);

        let cls = classNames({
            "buhta-grid": true,
            "ag-fresh": true,
        });


        return (
            <ComponentWrapper
                component={this}
                key={this.id}
                disabled={!this.enabled}
                className={cls}
                style={{
                    ...this.getTopLeftMixinStyle(),
                    ...this.getHeightWidthMixinStyle(),
                    overflow: "hidden",
                    border: "1px solid silver",
                }}>
                <AgGridReact
                    gridOptions={this.getGridOptions()}
                    suppressCellSelection={false}

                    suppressColumnVirtualisation={true}
                    enableSorting={true}
                    enableFilter={false}
                    onGridReady={this.gridReadyHandler}
                    rowStyle={{cursor: "pointer"}}
                    onGridSizeChanged={() => {
                        if (this.gridApi) this.gridApi.sizeColumnsToFit()
                    }}

                    onCellFocused={(e: any) => {
                        // if (this.onRowFocused) {
                        //     console.log(e, this.gridApi.getFocusedCell());
                        // }
                        if (this.onRowFocused) {

                            let focusedCell = this.gridApi.getFocusedCell();
                            if (focusedCell) {
                                let focusedRowIndex = focusedCell.rowIndex;
                                let renderedRows = this.gridApi.getRenderedNodes();

                                let focusedRowData: any;
                                for (let row of renderedRows) {
                                    if (row.rowIndex === focusedRowIndex) {
                                        focusedRowData = row.data;
                                        //console.log("onRowFocused", row, row.data);
                                        break;
                                    }
                                }
                                this.fireEvent(this.onRowFocused, {focusedRow: focusedRowData});
                            }
                        }
                    }}

                    onRowDataChanged={() => {
                        //this.refresh();
                        // if (this.comboGridApi) {
                        //
                        //     this.comboGridApi.doLayout();
                        //     this.comboGridApi.sizeColumnsToFit();
                        // }
                    }}

                    onRowClicked={(event: any) => {
                        // console.log(event);
                        // this.internalValue = event.data[this.lookupDataSource.getTitleFieldName()];
                        // this.bindObject[this.bindProperty] == event.data[this.lookupDataSource.getValueFieldName()];
                        // this.hideCombobox();
                    }}

                    onRowDoubleClicked={(event: any) => {
                        if (this.dataSource.onRowEditKeyPress) {
                            let focusedRow = this.getFocusedRow();
                            if (focusedRow && !focusedRow.__isFolder__()) {
                                this.dataSource.fireEvent(this.dataSource.onRowEditKeyPress, {focusedRow: focusedRow});
                            }
                        }
                    }}
                />
            </ComponentWrapper>
        );

    }

    getNodeChildDetails = (row: DataRow): any => {
        if (!row.__children__ || row.__children__.length == 0)
            return null;
        else
            return {
                group: true,
                expanded: true,
                children: row.__children__,
                // this is not used, however it is available to the cellRenderers,
                // if you provide a custom cellRenderer, you might use it. it's more
                // relavent if you are doing multi levels of groupings, not just one
                // as in this example.
                //field: 'group',
                // the key is used by the default group cellRenderer
                key: row.__key__
            };
    };


    nodes: DataRow[] = [];
    protected nodeList: { [key: string]: DataRow } = {};

    protected createNodesFromParentKey(rows: DataRow[]) {
        let contextName = "Grid.createNodesFromParentKey()";

        this.nodes = [];
        this.nodeList = {};

        if (!this.dataSource.idColumn)
            throw contextName + ": 'dataSource.idColumn' is undefined";
        let keyFieldName = this.dataSource.idColumn.fieldName;

        if (!this.dataSource.parentIdColumn)
            throw contextName + ": 'dataSource.parentIdColumn' is undefined";
        let parentKeyFieldName = this.dataSource.parentIdColumn.fieldName;


        rows.forEach((row: DataRow, index: number) => {
            if (!row.__key__) {
                row.__key__ = row.__getValue__(keyFieldName);
            }

            if (!isString(row.__key__))
                throw contextName + "key column '" + keyFieldName + "' must be string";

            if (!row.__parentKey__) {
                row.__parentKey__ = row.__getValue__(parentKeyFieldName);
            }
            if (row.__parentKey__ && !isString(row.__parentKey__))
                throw contextName + "parentKey column '" + keyFieldName + "' must be string";

            this.nodeList[row.__key__] = row;

        }, this);

        for (let key in this.nodeList) {
            let node = this.nodeList[key];
            if (!node.__children__)
                node.__children__ = [];
            if (!node.__parent__ && node.__parentKey__ !== undefined) {
                let parentNode = this.nodeList[node.__parentKey__];
                if (parentNode !== undefined) {
                    node.__parent__ = parentNode;
                    if (!parentNode.__children__)
                        parentNode.__children__ = [];
                    parentNode.__children__.push(node);
                }
            }
        }

        // заполняем root
        for (let key in this.nodeList) {
            let node = this.nodeList[key];
            if (!node.__parentKey__) {
                this.nodes.push(node);
            }
        }

        // сортировка children и проставление level
        let sortNodes = (nodes: DataRow[]): DataRow[] => {
            if (this.dataSource.positionColumn) {
                let positionFieldName = this.dataSource.positionColumn.fieldName;
                return nodes.sort((a: DataRow, b: DataRow) => {

                    let aa = a.__position__ || a.__getValue__(positionFieldName);
                    if (aa === undefined)
                        throw contextName + " position column '" + positionFieldName + "' not found";
                    if (!isNumber(aa))
                        throw contextName + ": position column '" + positionFieldName + "' must be a number";

                    let bb = b.__position__ || b.__getValue__(positionFieldName);
                    if (bb === undefined)
                        throw contextName + ": position column '" + positionFieldName + "' not found";
                    if (!isNumber(bb))
                        throw contextName + " position column '" + positionFieldName + "' must be a number";

                    return numberCompare(aa, bb);
                });
            }
            else {
                return nodes.sort((a: DataRow, b: DataRow) => numberCompare(a.__position__, b.__position__));
            }
        };


        let processNode = (node: DataRow, level: number) => {
            node.__level__ = level;
            node.__expanded__ = this.dataSource.autoExpandNodesToLevel !== undefined && node.__level__ < this.dataSource.autoExpandNodesToLevel;
            node.__children__ = sortNodes(node.__children__);
            node.__children__.forEach((node: DataRow) => {
                processNode(node, level + 1);
            }, this);
        };

        this.nodes.forEach((node: DataRow) => {
            processNode(node, 0);
        }, this);

        this.nodes = sortNodes(this.nodes);

    }

}