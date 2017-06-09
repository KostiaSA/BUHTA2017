import * as React from "react";
import {Component, IComponentRegistration, Компоненты_Данные} from "../component/Component";
import {IGridCellRenderer} from "../component/Grid";
import {EmittedCode} from "../designer/EmittedCode";
import {PropertyEditor, Категория_Основное, Категория_Прочее} from "../designer/property-editors/PropertyEditor";

export type DataType = "string" | "boolean" | "number" | "object";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Данные,
        componentClass: DataColumn,
        image: "vendor/fugue/icons/ui-toolbar.png",
        title: "DataColumn"
    }
}


export class DataColumn extends Component {


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


    // ------------------------------ fieldName ------------------------------
    protected _fieldName: string= this.__getDefaultValue_fieldName();
    get fieldName(): string{
        return this._fieldName;
    }

    set fieldName(value: string) {
        this.setPropertyWithForceUpdate("_fieldName",value);
    }

    protected __getDefaultValue_fieldName(): string {
        return undefined as any;
    }

    protected __emitCode_fieldName(code: EmittedCode) {
        code.emitStringValue(this, "fieldName");
    }

    protected  __getPropertyEditor_fieldName(): PropertyEditor {
        let StringPropertyEditor = require("../designer/property-editors/StringPropertyEditor").StringPropertyEditor;

        let pe = new StringPropertyEditor();
        pe.propertyName = "fieldName";
        pe.category = Категория_Основное;
        return pe;
    }


    dataType: DataType;

    hidden: boolean;

    gridCellRenderer: IGridCellRenderer;

    isNonVisual(): boolean {
        return true;
    }

}