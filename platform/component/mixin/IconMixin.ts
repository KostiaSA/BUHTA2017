import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
import {appStateforceUpdate} from "../../util/appStateforceUpdate";

export function IconMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }


        // ------------------------------ icon ------------------------------
        protected _icon: string = this.icon_default;
        get icon(): string {
            return this._icon;
        }

        set icon(value: string) {
            this.setPropertyWithForceUpdate("_icon",value);
        }

        protected get icon_default(): string {
            return undefined as any;
        }

        // emitCode_icon(code: EmittedCode) {
        //     code.emitBooleanValue(this, "icon", true);
        // }

        // protected  __setOptions_icon() {
        //     this.icon = this._icon;
        // }
        //
        // protected  __getPropertyEditor_icon(): PropertyEditor {
        //     let pe = new BooleanPropertyEditor();
        //     pe.default=this.icon_default;
        //     pe.propertyName = "icon";
        //     pe.category = Категория_Прочее;
        //     return pe;
        // }

    }
}
