import * as React from "react";
import * as classNames from "classnames";
import {Component, IEvent, IEventArgs} from "./Component";
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

export interface IRowFocusedEventArgs extends IEventArgs {
    sender: Grid;
    focusedRow: DataRow;
}


export class Grid extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {


    // ------------------------------ onRowFocused ------------------------------


    _onRowFocused: IEvent<IRowFocusedEventArgs>;
    get onRowFocused(): IEvent<IRowFocusedEventArgs> {
        return this._onRowFocused;
    }

    set onRowFocused(value: IEvent<IRowFocusedEventArgs>) {
        this._onRowFocused = value;
    }

    protected  __emitCode_onRowFocused(code: EmittedCode) {
        code.emitEventValue(this, "onRowFocused");
    }


    dataSource: DataTable<DataColumn, DataRow>;

    async loadData() {
        if (!this.dataSource)
            return;

        let cols: AgGridColDef[] = [];
        for (let dataColumn of this.dataSource.getColumns()) {
            if (!dataColumn.hidden) {
                let agCol: AgGridColDef = {
                    // colId: "col0",
                    headerName: dataColumn.name,
                    field: dataColumn.name,
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
            this.createNodesFromParentKey(rows);
        }
        else {
            this.nodes = rows;
        }

        //console.log(".............................", cols, this.nodes);

        this.gridApi.setColumnDefs(cols);
        this.gridApi.setRowData(this.nodes);
        this.gridApi.doLayout();

    }

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
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

    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("Grid-getReactElement()", this.enabled);

        let cls = classNames({
            "buhta-grid": true,
            "ag-fresh": true,
        });


        let gridOptions = {
            getNodeChildDetails: this.getNodeChildDetails

        };


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
                    gridOptions={gridOptions}
                    suppressCellSelection={false}
                    className="ag-fresh"
                    rowHeight={22}
                    headerHeight={22}

                    suppressColumnVirtualisation={true}
                    enableSorting={true}
                    enableFilter={false}
                    onGridReady={this.gridReadyHandler}
                    rowStyle={{cursor: "pointer"}}
                    onGridSizeChanged={() => {
                        if (this.gridApi) this.gridApi.sizeColumnsToFit()
                    }}

                    onCellFocused={(e: any) => {
                        if (this.onRowFocused) {
                            console.log(e,this.gridApi.getFocusedCell());
                        }
                        if (this.onRowFocused) {

                            let focusedCell=this.gridApi.getFocusedCell();
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

                        // $(this.popupElement).find(".ag-cell").off("keydown.buhta");
                        // $(this.popupElement).find(".ag-cell").on("keydown.buhta", (event) => {
                        //     //console.log(event.keyCode);
                        //
                        //     if (event.keyCode === 13) {
                        //
                        //         let focusedRowIndex = this.comboGridApi.getFocusedCell().rowIndex;
                        //         let renderedRows = this.comboGridApi.getRenderedNodes();
                        //
                        //         for (let row of renderedRows) {
                        //             if (row.rowIndex === focusedRowIndex) {
                        //                 this.internalValue = row.data[this.lookupDataSource.getTitleFieldName()];
                        //                 this.bindObject[this.bindProperty] == row.data[this.lookupDataSource.getValueFieldName()];
                        //                 this.hideCombobox();
                        //                 break;
                        //             }
                        //         }
                        //
                        //     }
                        //     if (event.keyCode === 27) {
                        //         this.hideCombobox();
                        //     }
                        //});
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