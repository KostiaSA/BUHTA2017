import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
import {EmittedCode} from "../../designer/EmittedCode";


export function VisibleMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }


        // ------------------------------ Visible ------------------------------
        protected _visible: boolean = this.__getDefaultValue_visible();
        get visible(): boolean {
            return this._visible;
        }

        set visible(value: boolean) {
            this.setPropertyWithForceUpdate("_visible",value);
        }

        protected __getDefaultValue_visible(): boolean {
            return true;
        }

        emitCode_visible(code: EmittedCode) {
            code.emitBooleanValue(this, "visible");
        }


    }
}
