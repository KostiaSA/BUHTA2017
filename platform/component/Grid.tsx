import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
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


export class Grid extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {


    init() {
        if (this.initialized) return;
        super.init();
    }

    dataSource: DataTable<DataColumn, DataRow>;

    async loadData() {
        if (!this.dataSource)
            return;

        let cols: AgGridColDef[] = [];
        for (let dataColumn of this.dataSource.getColumns()) {
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

        this.gridApi.setColumnDefs(cols);

        let rows = await this.dataSource.getRows();

        console.log(".............................",cols,rows);

        this.gridApi.setRowData(rows);
        this.gridApi.doLayout();

    }

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private gridRowData: any[] = [];


    gridReadyHandler = (event: { api: GridApi, columnApi: ColumnApi }) => {
        this.gridApi = event.api;
        this.gridColumnApi = event.columnApi;

        //this.comboGridApi.addEventListener()

        //this.comboGridApi.doLayout();
        //this.comboGridApi.sizeColumnsToFit();

        //console.log("gridReadyHandler==========================================================");
    };

    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        console.log("Grid-getReactElement()", this.enabled);

        let cls = classNames({
            "buhta-grid": true,
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

}