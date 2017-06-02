import * as React from "react";
import {Component} from "../component/Component";
import {DataColumn} from "./DataColumn";
import {DataTable} from "./DataTable";

export class DataRow extends Component {
    __table__: DataTable<any, any>;
    __column__: DataColumn;
    __added__: boolean;
    __changed__: boolean;
    __deleted__: boolean;
    [name: string]: any;
}