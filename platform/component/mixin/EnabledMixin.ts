import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
import {appStateforceUpdate} from "../../util/appStateforceUpdate";

export function EnabledMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }


        // ------------------------------ enabled ------------------------------
        protected _enabled: boolean = this.enabled_default;
        get enabled(): boolean {
            return this._enabled;
        }

        set enabled(value: boolean) {
            let needUpdate = this._enabled !== value;
            this._enabled = value;
            appStateforceUpdate(needUpdate);
        }

        protected get enabled_default(): boolean {
            return true;
        }

        // emitCode_enabled(code: EmittedCode) {
        //     code.emitBooleanValue(this, "enabled", true);
        // }

        // protected  __setOptions_enabled() {
        //     this.enabled = this._enabled;
        // }
        //
        // protected  __getPropertyEditor_enabled(): PropertyEditor {
        //     let pe = new BooleanPropertyEditor();
        //     pe.default=this.enabled_default;
        //     pe.propertyName = "enabled";
        //     pe.category = Категория_Прочее;
        //     return pe;
        // }

    }
}
