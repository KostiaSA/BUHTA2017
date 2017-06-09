import * as React from "react";
import {DataColumn} from "./DataColumn";
import {DataRow} from "./DataRow";
import {Component, IEvent} from "../component/Component";
import {IRowAddEditDeleteKeyPressEventArgs} from "../component/Grid";
import {EmittedCode} from "../designer/EmittedCode";
import {PropertyEditor, Категория_События} from "../designer/property-editors/PropertyEditor";

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

    //<editor-fold desc="---------- property: onRowAddKeyPress ----------">
    _onRowAddKeyPress: IEvent<IRowAddEditDeleteKeyPressEventArgs>;
    get onRowAddKeyPress(): IEvent<IRowAddEditDeleteKeyPressEventArgs> {
        return this._onRowAddKeyPress;
    }

    set onRowAddKeyPress(value: IEvent<IRowAddEditDeleteKeyPressEventArgs>) {
        this._onRowAddKeyPress = value;
    }

    protected __getDefaultValue_onRowAddKeyPress(): IEvent<IRowAddEditDeleteKeyPressEventArgs> {
        return undefined as any;
    }

    protected  __emitCode_onRowAddKeyPress(code: EmittedCode) {
        code.emitEventValue(this, "onRowAddKeyPress");
    }

    protected  __getPropertyEditor_onRowAddKeyPress(): PropertyEditor {
        let EventPropertyEditor = require("../../designer/property-editors/EventPropertyEditor").EventPropertyEditor;

        let pe = new EventPropertyEditor();
        pe.propertyName = "onRowAddKeyPress";
        pe.category = Категория_События;
        return pe;
    }

    //</editor-fold>

    //<editor-fold desc="---------- property: onRowEditKeyPress ----------">
    _onRowEditKeyPress: IEvent<IRowAddEditDeleteKeyPressEventArgs>;
    get onRowEditKeyPress(): IEvent<IRowAddEditDeleteKeyPressEventArgs> {
        return this._onRowEditKeyPress;
    }

    set onRowEditKeyPress(value: IEvent<IRowAddEditDeleteKeyPressEventArgs>) {
        this._onRowEditKeyPress = value;
    }

    protected __getDefaultValue_onRowEditKeyPress(): IEvent<IRowAddEditDeleteKeyPressEventArgs> {
        return undefined as any;
    }

    protected  __emitCode_onRowEditKeyPress(code: EmittedCode) {
        code.emitEventValue(this, "onRowEditKeyPress");
    }

    protected  __getPropertyEditor_onRowEditKeyPress(): PropertyEditor {
        let EventPropertyEditor = require("../../designer/property-editors/EventPropertyEditor").EventPropertyEditor;

        let pe = new EventPropertyEditor();
        pe.propertyName = "onRowEditKeyPress";
        pe.category = Категория_События;
        return pe;
    }

    //</editor-fold>

    //<editor-fold desc="---------- property: onRowDeleteKeyPress ----------">
    _onRowDeleteKeyPress: IEvent<IRowAddEditDeleteKeyPressEventArgs>;
    get onRowDeleteKeyPress(): IEvent<IRowAddEditDeleteKeyPressEventArgs> {
        return this._onRowDeleteKeyPress;
    }

    set onRowDeleteKeyPress(value: IEvent<IRowAddEditDeleteKeyPressEventArgs>) {
        this._onRowDeleteKeyPress = value;
    }

    protected __getDefaultValue_onRowDeleteKeyPress(): IEvent<IRowAddEditDeleteKeyPressEventArgs> {
        return undefined as any;
    }

    protected  __emitCode_onRowDeleteKeyPress(code: EmittedCode) {
        code.emitEventValue(this, "onRowDeleteKeyPress");
    }

    protected  __getPropertyEditor_onRowDeleteKeyPress(): PropertyEditor {
        let EventPropertyEditor = require("../../designer/property-editors/EventPropertyEditor").EventPropertyEditor;

        let pe = new EventPropertyEditor();
        pe.propertyName = "onRowDeleteKeyPress";
        pe.category = Категория_События;
        return pe;
    }

    //</editor-fold>

}