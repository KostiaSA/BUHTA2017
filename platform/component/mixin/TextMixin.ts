import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
import {PropertyEditor, Категория_Прочее} from "../../designer/PropertyEditor";
//import {appStateforceUpdate} from "../../util/appStateforceUpdate";

export function TextMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }


        // ------------------------------ text ------------------------------
        protected _text: string | JSX.Element= this.text_default;
        get text(): string | JSX.Element{
            return this._text;
        }

        set text(value: string| JSX.Element) {
            this.setPropertyWithForceUpdate("_text",value);
        }

        protected get text_default(): string| JSX.Element {
            return undefined as any;
        }

        // emitCode_text(code: EmittedCode) {
        //     code.emitBooleanValue(this, "text", true);
        // }

        protected  __getPropertyEditor_text(): PropertyEditor {
            let StringPropertyEditor = require("../../designer/StringPropertyEditor").StringPropertyEditor;

            let pe = new StringPropertyEditor();
            pe.default=this.text_default;
            pe.propertyName = "text";
            pe.category = Категория_Прочее;
            return pe;
        }

    }
}
