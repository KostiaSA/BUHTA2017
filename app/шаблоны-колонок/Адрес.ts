import {SqlTable} from "../../platform/sql/SqlTable";
import {SqlColumn, SqlDataType} from "../../platform/sql/SqlColumn";
import {IComponentRegistration, Компоненты_Данные} from "../../platform/component/Component";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Данные,
        componentClass: Адрес,
        image: "vendor/fugue/icons/ui-toolbar.png",
        title: "Адрес: sql колонка"
    }
}

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

    protected __getDefaultValue_fieldName(): string {
        return "адрес";
    }

    protected __getDefaultValue_sqlDataType(): SqlDataType {
        return "varchar";
    }
}