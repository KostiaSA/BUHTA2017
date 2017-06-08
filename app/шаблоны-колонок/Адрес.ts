import {SqlTable} from "../../platform/sql/SqlTable";
import {SqlColumn, SqlDataType} from "../../platform/sql/SqlColumn";

export class Адрес extends SqlColumn {
    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    //=== END-DESIGNER-DECLARE-CODE ===//

    constructor() {
        super();
        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.fieldName = "адрес";
        this.sqlDataType="varchar";
        //=== END-DESIGNER-INIT-CODE ===//
    }

    protected get fieldName_default(): string {
        return "адрес";
    }

    protected get sqlDataType_default(): SqlDataType {
        return "varchar";
    }
}