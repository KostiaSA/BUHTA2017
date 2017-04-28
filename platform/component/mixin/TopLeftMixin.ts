import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
//import {appStateforceUpdate} from "../../util/appStateforceUpdate";

export function TopLeftMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        getTopLeftMixinStyle():any{
            return {
                position: this.top || this.left|| this.bottom|| this.right ? "absolute" : "relative",
                top: this.top,
                left: this.left,
                bottom: this.bottom,
                right: this.right,
            }
        }

        // ------------------------------ top ------------------------------
        protected get top_default(): number {
            return undefined as any;
        }

        _top: number = this.top_default;
        get top(): number {
            return this._top;
        }

        set top(value: number) {
            this.setPropertyWithForceUpdate("_top", value);
        }

        // protected __emitCode_top(code: EmittedCode) {
        //     code.emitNumberValue(this, "top", this.top_default);
        // }

        // protected  __getPropertyEditor_top(): PropertyEditor {
        //     let pe = new NumberPropertyEditor();
        //     pe.default = this.top_default;
        //     pe.propertyName = "top";
        //     pe.category = Категория_РазмерПозиция;
        //     return pe;
        // }

        // ------------------------------ left ------------------------------
        get left_default(): number {
            return undefined as any;
        }

        _left: number = this.left_default;
        get left(): number {
            return this._left;
        }

        set left(value: number) {
            this.setPropertyWithForceUpdate("_left", value);
        }

        // protected  __emitCode_left(code: EmittedCode) {
        //     code.emitNumberValue(this, "left", this.left_default);
        // }
        //
        // protected  __getPropertyEditor_left(): PropertyEditor {
        //     let pe = new NumberPropertyEditor();
        //     pe.default = this.left_default;
        //     pe.propertyName = "left";
        //     pe.category = Категория_РазмерПозиция;
        //     return pe;
        // }

        // ------------------------------ bottom ------------------------------
        protected get bottom_default(): number {
            return undefined as any;
        }

        _bottom: number = this.bottom_default;
        get bottom(): number {
            return this._bottom;
        }

        set bottom(value: number) {
            this.setPropertyWithForceUpdate("_bottom", value);
        }

        // protected __emitCode_bottom(code: EmittedCode) {
        //     code.emitNumberValue(this, "bottom", this.bottom_default);
        // }

        // protected  __getPropertyEditor_bottom(): PropertyEditor {
        //     let pe = new NumberPropertyEditor();
        //     pe.default = this.bottom_default;
        //     pe.propertyName = "bottom";
        //     pe.category = Категория_РазмерПозиция;
        //     return pe;
        // }

        // ------------------------------ right ------------------------------
        get right_default(): number {
            return undefined as any;
        }

        _right: number = this.right_default;
        get right(): number {
            return this._right;
        }

        set right(value: number) {
            this.setPropertyWithForceUpdate("_right", value);
        }

        // protected  __emitCode_right(code: EmittedCode) {
        //     code.emitNumberValue(this, "right", this.right_default);
        // }
        //
        // protected  __getPropertyEditor_right(): PropertyEditor {
        //     let pe = new NumberPropertyEditor();
        //     pe.default = this.right_default;
        //     pe.propertyName = "right";
        //     pe.category = Категория_РазмерПозиция;
        //     return pe;
        // }
    }
}
