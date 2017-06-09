import {DataTable} from "../data/DataTable";
import {DataRow} from "../data/DataRow";
import {SqlColumn} from "./SqlColumn";
import {SqlColumns} from "./SqlColumns";
import {SqlIndexes} from "./SqlIndexes";
import {EmittedCode} from "../designer/EmittedCode";
import {PropertyEditor, Категория_Основное} from "../designer/property-editors/PropertyEditor";
import {IComponentRegistration, Компоненты_Данные} from "../component/Component";


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Данные,
        componentClass: SqlTable,
        image: "vendor/fugue/icons/database-sql.png",
        title: "SqlTable"
    }
}



export class SqlTable extends DataTable<SqlColumn, DataRow> {

    columns: SqlColumns;
    indexes: SqlIndexes;

    constructor() {
        super();
        this.columns = new SqlColumns();
        this.indexes = new SqlIndexes();

        this.childrenAdd(this.columns);
        this.childrenAdd(this.indexes);
    }

    getToolBoxLabel(): string {
        return __registerBuhtaComponent__().title || super.getToolBoxLabel();
    }

    getDesignerLabel(): string {
        return this.sqlName+ "  (sql-таблица)";
    }

    getDesignerImage(): string {
        return __registerBuhtaComponent__().image || super.getDesignerImage();
    }

    getDesignerCategory(): string {
        return __registerBuhtaComponent__().category || super.getDesignerCategory();
    }

    isNonVisual(): boolean {
        return true;
    }

    // ------------------------------ sqlName ------------------------------
    protected _sqlName: string | JSX.Element= this.__getDefaultValue_sqlName();
    get sqlName(): string | JSX.Element{
        return this._sqlName;
    }

    set sqlName(value: string| JSX.Element) {
        this.setPropertyWithForceUpdate("_sqlName",value);
    }

    protected __getDefaultValue_sqlName(): string| JSX.Element {
        return undefined as any;
    }

    protected __emitCode_sqlName(code: EmittedCode) {
        code.emitStringValue(this, "sqlName");
    }

    protected  __getPropertyEditor_sqlName(): PropertyEditor {
        let StringPropertyEditor = require("../designer/property-editors/StringPropertyEditor").StringPropertyEditor;

        let pe = new StringPropertyEditor();
        pe.propertyName = "sqlName";
        pe.category = Категория_Основное;
        return pe;
    }


}