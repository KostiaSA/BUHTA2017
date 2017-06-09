import * as React from "react";
import {DataColumn} from "./DataColumn";
import {DataRow} from "./DataRow";
import {Component} from "../component/Component";

export class DataTable<Col extends DataColumn, Row extends DataRow> extends Component {
    name: string;

    treeView: boolean;

    idColumn: DataColumn;
    parentIdColumn: DataColumn;
    positionColumn: DataColumn; // для сортировки

    async getRows(): Promise<Row[]> {
        throw this.constructor.name + ".getRows(): abstract error";
    }

    getColumns(): Col[] {
        let cols: Col[] = [];
        for (let child of this.children) {
            if (child instanceof DataColumn) {
                cols.push(child as Col);
            }
        }
        return cols;
    }

    // для отображения в Grid
    autoExpandNodesToLevel: number;
    hideColumnHeaders: boolean;
    rowHeight: number;
    headerHeight: number;
    sizeColumnsToFit:boolean;

}