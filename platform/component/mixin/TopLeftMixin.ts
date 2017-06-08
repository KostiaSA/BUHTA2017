import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
import {PropertyEditor, Категория_РазмерПозиция} from "../../designer/PropertyEditor";
import {EmittedCode} from "../../designer/EmittedCode";

//import {appStateforceUpdate} from "../../util/appStateforceUpdate";

export function TopLeftMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        getTopLeftMixinStyle(): any {
            return {
                position: this.top || this.left || this.bottom || this.right ? "absolute" : "relative",
                top: this.top,
                left: this.left,
                bottom: this.bottom,
                right: this.right,
            }
        }

        // ------------------------------ top ------------------------------
        protected __getDefaultValue_top(): number {
            return undefined as any;
        }

        _top: number = this.__getDefaultValue_top();
        get top(): number {
            return this._top;
        }

        set top(value: number) {
            this.setPropertyWithForceUpdate("_top", value);
        }

        protected __emitCode_top(code: EmittedCode) {
            code.emitNumberValue(this, "top");
        }

        protected  __getPropertyEditor_top(): PropertyEditor {
            let NumberPropertyEditor = require("../../designer/NumberPropertyEditor").NumberPropertyEditor;
            let pe = new NumberPropertyEditor();
            pe.propertyName = "top";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

        // ------------------------------ left ------------------------------
        protected __getDefaultValue_left(): number {
            return undefined as any;
        }

        _left: number = this.__getDefaultValue_left();
        get left(): number {
            return this._left;
        }

        set left(value: number) {
            this.setPropertyWithForceUpdate("_left", value);
        }

        protected  __emitCode_left(code: EmittedCode) {
            code.emitNumberValue(this, "left");
        }


        protected  __getPropertyEditor_left(): PropertyEditor {
            let NumberPropertyEditor = require("../../designer/NumberPropertyEditor").NumberPropertyEditor;
            let pe = new NumberPropertyEditor();
            pe.propertyName = "left";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

        // ------------------------------ bottom ------------------------------
        protected __getDefaultValue_bottom(): number {
            return undefined as any;
        }

        _bottom: number = this.__getDefaultValue_bottom();
        get bottom(): number {
            return this._bottom;
        }

        set bottom(value: number) {
            this.setPropertyWithForceUpdate("_bottom", value);
        }

        protected __emitCode_bottom(code: EmittedCode) {
            code.emitNumberValue(this, "bottom");
        }

        protected  __getPropertyEditor_bottom(): PropertyEditor {
            let NumberPropertyEditor = require("../../designer/NumberPropertyEditor").NumberPropertyEditor;
            let pe = new NumberPropertyEditor();
            pe.propertyName = "bottom";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

        // ------------------------------ right ------------------------------
        protected __getDefaultValue_right(): number {
            return undefined as any;
        }

        _right: number = this.__getDefaultValue_right();
        get right(): number {
            return this._right;
        }

        set right(value: number) {
            this.setPropertyWithForceUpdate("_right", value);
        }

        protected  __emitCode_right(code: EmittedCode) {
            code.emitNumberValue(this, "right");
        }

        protected  __getPropertyEditor_right(): PropertyEditor {
            let NumberPropertyEditor = require("../../designer/NumberPropertyEditor").NumberPropertyEditor;
            let pe = new NumberPropertyEditor();
            pe.propertyName = "right";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }
    }
}
