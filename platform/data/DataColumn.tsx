import * as React from "react";
import {Component} from "../component/Component";

export type DataType = "string" | "boolean" | "number" | "object";

export class DataColumn extends Component {
    fieldName: string;
    dataType: DataType;

    hidden:boolean;
}