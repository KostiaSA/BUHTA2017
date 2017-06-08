import {DataColumn} from "../data/DataColumn";
import {EmittedCode} from "../designer/EmittedCode";
import {PropertyEditor, Категория_Прочее} from "../designer/PropertyEditor";
import {IComponentRegistration, Компоненты_Данные} from "../component/Component";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Данные,
        componentClass: DataColumn,
        image: "vendor/fugue/icons/ui-toolbar.png",
        title: "DataColumn"
    }
}


export type SqlDataType =
    "boolean"
    | "int8"
    | "uint8"
    | "int16"
    | "uint16"
    | "int32"
    | "uint32"
    | "int64"
    | "uint64"
    | "float"
    | "double"
    | "money"
    | "decimal"
    | "guid"
    | "fk"
    | "varchar";


export class SqlColumn extends DataColumn {

    isNonVisual(): boolean {
        return true;
    }

    getToolBoxLabel(): string {
        return __registerBuhtaComponent__().title || super.getToolBoxLabel();
    }

    getDesignerLabel(): string {
        return this.fieldName + ":  " + this.sqlDataType;
    }

    getDesignerImage(): string {
        return __registerBuhtaComponent__().image || super.getDesignerImage();
    }

    getDesignerCategory(): string {
        return __registerBuhtaComponent__().category || super.getDesignerCategory();
    }

    // ------------------------------ sqlDataType ------------------------------
    protected _sqlDataType: SqlDataType = this.sqlDataType_default;
    get sqlDataType(): SqlDataType {
        return this._sqlDataType;
    }

    set sqlDataType(value: SqlDataType) {
        this.setPropertyWithChangeCallback("_sqlDataType", value, () => {
            console.log("new sqlDataType", value);
        });
    }

    protected get sqlDataType_default(): SqlDataType {
        return undefined as any;
    }

    protected __emitCode_sqlDataType(code: EmittedCode) {
        code.emitStringValue(this, "sqlDataType", this.sqlDataType_default);
    }

    protected  __getPropertyEditor_sqlDataType(): PropertyEditor {
        let StringPropertyEditor = require("../designer/StringPropertyEditor").StringPropertyEditor;

        let pe = new StringPropertyEditor();
        pe.default = this.sqlDataType_default;
        pe.propertyName = "sqlDataType";
        pe.category = Категория_Прочее;
        return pe;
    }


}