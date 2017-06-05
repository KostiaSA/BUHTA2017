import * as React from "react";
import {Component} from "../component/Component";
import {DataColumn} from "./DataColumn";
import {DataTable} from "./DataTable";

export class DataRow {
    __table__: DataTable<any, any>;
    __column__: DataColumn;

    // для изменений
    __added__: boolean;
    __changed__: boolean;
    __deleted__: boolean;

    __focused__: boolean;
    __selected__: boolean;
    __icon__: string;

    // для treeView
    __level__: number;
    __key__: string;
    __parentKey__: string;
    __expanded__: boolean;
    __children__: DataRow[];
    __parent__: DataRow;
    __position__: number; // порядок сортировки
    getNodeChildDetails: (row: DataRow) => void;

    __getValue__(fieldName: string): any {
        return (this as any)[fieldName];
    }

    __setValue__(fieldName: string, value: any): any {
        return (this as any)[fieldName] = value;
    }

    //[name: string]: any;
}