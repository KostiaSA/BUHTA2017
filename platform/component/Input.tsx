import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {Span} from "../react/Span";


export interface IInputStyle {
    //headerHeight: number;
    borderColor: string;
    backgroundColor: string;
}

export const DefaultInputStyle: IInputStyle = {
    //headerHeight: 26,
    borderColor: "lightskyblue",
    backgroundColor: "white"

};

export class Input extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {

    style: IInputStyle = DefaultInputStyle;


    init() {
        if (this.initialized) return;
        super.init();
    }

    protected get height_default(): number | string {
        return 22;
    }


    // ------------------------------ bindObject ------------------------------
    _bindObject: any;
    get bindObject(): any {
        return this._bindObject;
    }

    set bindObject(value: any) {
        this._bindObject = value;
        if (this.bindProperty && this.bindProperty) {
            this.internalValue = this.bindObject[this.bindProperty];
        }
        // if (this.$) {
        //     if (this._designer) {
        //         this.$.text("[" + this._bindProperty + "]:" + this.valueType);
        //     }
        //     else {
        //         if (this.bindObject && this.$.val() !== this.bindObject[this.bindProperty])
        //             this.$.val(this.bindObject[this.bindProperty]);
        //     }
        // }

    }

    // private __emitCode_bindObject(code: EmittedCode) {
    //     //code.emitobjectValue(this, "bindObject");
    // }


    // ------------------------------ bindProperty ------------------------------
    _bindProperty: string;
    get bindProperty(): string {
        return this._bindProperty;
    }

    set bindProperty(value: string) {
        this._bindProperty = value;
        if (this.bindProperty && this.bindProperty) {
            this.internalValue = this.bindObject[this.bindProperty];
        }
        // if (this.$) {
        //     if (this._designer) {
        //         this.$.text("[" + this._bindProperty + "]:" + this.valueType);
        //     }
        //     else {
        //         if (this.bindObject && this.$.val() !== this.bindObject[this.bindProperty])
        //             this.$.val(this.bindObject[this.bindProperty]);
        //     }
        // }
    }

    // private __emitCode_bindProperty(code: EmittedCode) {
    //     code.emitStringValue(this, "bindProperty");
    // }
    //
    // private __getPropertyEditor_bindProperty(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "bindProperty";
    //     pe.category = Категория_ПривязкаДанных;
    //     return pe;
    // }

    // ------------------------------ getReactElement ------------------------------

    internalValue: string;

    handleValueChange = (event: any) => {
        this.internalValue = event.target.value;
        this.refresh();
    };

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        console.log("Input-getReactElement()", this.enabled);

        let inputClass = classNames({
            "buhta-input": true,
            "disabled": !this.enabled,
        });

        let mainSpanStyle = {
            ...this.getTopLeftMixinStyle(),
            overflow: "hidden",
            padding: 0,
            whiteSpace: "nowrap",
            width: this.width,
            cursor: this.enabled ? "pointer" : "default",
        };

        return (
            <span
                style={mainSpanStyle}
            >
                <input
                    type="text"
                    value={this.internalValue}
                    onChange={this.handleValueChange}
                />
            </span>
        );

    }

}