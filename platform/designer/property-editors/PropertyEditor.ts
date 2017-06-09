import {Component} from "../../component/Component";

export const Категория_Основное = "основное";
export const Категория_РазмерПозиция = "размер и позиция";
export const Категория_Стиль = "стиль";
export const Категория_Содержимое = "содержимое";
export const Категория_ПривязкаДанных = "привязка данных";
export const Категория_DragDrop = "перетаскивание";
export const Категория_ComboBox = "список для выбора";
export const Категория_Прочее = "прочее";
export const Категория_События = "события";

export const PropertyEditorCategories = [
    Категория_Основное,
    Категория_РазмерПозиция,
    Категория_Стиль,
    Категория_Содержимое,
    Категория_ПривязкаДанных,
    Категория_ComboBox,
    Категория_DragDrop,
    Категория_Прочее,
    Категория_События,
];

export class PropertyEditor {
    component: Component;
    propertyName: string;
    category: string;
    title: string;
    help: string;
//    default: any;

    render(): JSX.Element {
        throw "PropertyEditor.render(): abstract error";
    }

    visible: () => boolean = () => true;
}