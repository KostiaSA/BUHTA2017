
import {Component, IComponentRegistration, Компоненты_Данные} from "../component/Component";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Данные,
        componentClass: SqlIndexes,
        image: "vendor/fugue/icons/folder-horizontal.png",
        title: "колонки"
    }
}


export class SqlIndexes extends Component {

    isNonVisual(): boolean {
        return true;
    }

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
}