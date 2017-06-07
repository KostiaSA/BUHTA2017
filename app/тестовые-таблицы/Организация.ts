import {SqlTable} from "../../platform/sql/SqlTable";
import {SqlColumn} from "../../platform/sql/SqlColumn";

export class Организация extends SqlTable {
    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    номер: SqlColumn;
    название: SqlColumn;
    //=== END-DESIGNER-DECLARE-CODE ===//

    constructor() {
        super();
        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.sqlName = "Организация";

        this.номер = new SqlColumn();
        this.номер.fieldName = "номер";
        this.номер.sqlDataType="varchar";
        this.columns.childrenAdd(this.номер);

        this.название = new SqlColumn();
        this.название.fieldName = "название";
        this.название.sqlDataType="varchar";
        this.columns.childrenAdd(this.название);

        //=== END-DESIGNER-INIT-CODE ===//
    }

}