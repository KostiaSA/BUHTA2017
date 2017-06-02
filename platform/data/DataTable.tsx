import * as React from "react";
import {DataColumn} from "./DataColumn";
import {DataRow} from "./DataRow";
import {Component} from "../component/Component";

export class DataTable<C extends DataColumn, R extends DataRow> extends Component{
    name: string;

    treeView:boolean;

    idColumn:DataColumn;
    parentIdColumn:DataColumn;

    async getRows():Promise<R[]>{
        throw this.constructor.name+".getRows(): abstract error";
    }
}