import {MixinConstructor} from "./MixinConstructor";
import {Component} from "../Component";
import {PropertyEditor, Категория_РазмерПозиция} from "../../designer/PropertyEditor";
import {StringPropertyEditor} from "../../designer/StringPropertyEditor";
import {EmittedCode} from "../../designer/EmittedCode";
import {isString} from "util";

export function HeightWidthMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        getHeightWidthMixinStyle():any{
            return {
                height: this.height,
                width: this.width,
            }
        }

        // ------------------------------ height ------------------------------
        _height: number | string = this.height_default;

        get height(): number | string {
            return this._height;
        }

        set height(value: number | string) {
            this.setPropertyWithForceUpdate("_height", value);
        }

        protected get height_default(): number | string {
            return undefined as any;
        }

        protected __emitCode_height(code: EmittedCode) {
            if (isString(this.height))
                code.emitStringValue(this, "height", this.height_default);
            else
                code.emitNumberValue(this, "height", this.height_default);
        }


        protected __getPropertyEditor_height(): PropertyEditor {
            let StringPropertyEditor = require("../../designer/StringPropertyEditor").StringPropertyEditor;

            let pe = new StringPropertyEditor();
            pe.default = this.height_default;
            pe.propertyName = "height";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

        // ------------------------------ width ------------------------------
        _width: number | string = this.width_default;
        get width(): number | string {
            return this._width;
        }

        set width(value: number | string) {
            this.setPropertyWithForceUpdate("_width", value);
            // if (this.$) {
            //     if ((this as any).dock === "fill")
            //         value = "100%";
            //     if (value !== "auto") {
            //         if ((this as any).jqxWidget) {
            //             (this as any).jqxWidget({width: value});
            //         }
            //         else {
            //             if (value)
            //                 this.$.width(value);
            //         }
            //     }
            // }
        }

        protected get width_default(): number | string {
            return undefined as any;
        }

        protected __emitCode_width(code: EmittedCode) {
            if (isString(this.width))
                code.emitStringValue(this, "width", this.width_default);
            else
                code.emitNumberValue(this, "width", this.width_default);
        }

        protected __getPropertyEditor_width(): PropertyEditor {
            let StringPropertyEditor = require("../../designer/StringPropertyEditor").StringPropertyEditor;
            let pe = new StringPropertyEditor();
            pe.default = this.width_default;
            pe.propertyName = "width";
            pe.category = Категория_РазмерПозиция;
            return pe;
        }

    }
}
