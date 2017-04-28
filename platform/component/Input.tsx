import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {CSSProperties, KeyboardEvent, SyntheticEvent} from "react";
import {DraggableResizable} from "../react/DraggableResizable";


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
        return 20;
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
    inputElement: HTMLElement;

    popupVisible: boolean;
    popupHeight: number = 300;
    popupWidth: number = 300;
    popupElement: HTMLElement;

    handleInputValueChange = (event: any) => {
        this.internalValue = event.target.value;
        this.refresh();
    };

    handleInputKeyPress = (event: KeyboardEvent<any>) => {
        //this.internalValue = event.code;
        //console.log(event.charCode);
        //this.refresh();
    };

    handleInputKeyDown = (event: KeyboardEvent<any>) => {
        //this.internalValue = event.code;
        if (event.key === "ArrowDown") {
            this.popupVisible = true;
            console.log(event.key);
        }
        if (event.key === "Escape") {
            this.popupVisible = false;
            console.log(event.key);
        }
        this.refresh();
    };

    afterRender(isFirstRender: boolean) {
        super.afterRender(isFirstRender);
        console.log("afterRender", isFirstRender);
        if (this.popupVisible) {
            ($(this.popupElement) as any).position({
                of: $(this.inputElement),
                my: "left top",
                at: "left bottom",
                collision: "none none"
            });
        }
    }


    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        console.log("Input-getReactElement()", this.enabled);

        let inputClass = classNames({
            "buhta-input": true,
            "disabled": !this.enabled,
        });

        let mainSpanStyle: CSSProperties = {
            ...this.getTopLeftMixinStyle(),
            overflow: "hidden",
            padding: 0,
            whiteSpace: "nowrap",
            width: this.width,
            cursor: this.enabled ? "pointer" : "default",
        };

        let inputStyle: CSSProperties = {
            height: this.height,
            width: this.width,
            paddingLeft: 5,
            paddingRight: 3
        };

        let popupStyle: CSSProperties = {
            backgroundColor: "white",
            position: "fixed",
            zIndex: 1000,
            display: this.popupVisible ? "block" : "none",
            border: "1px solid silver",
            top: 0,
            left: 0,
            height: this.popupHeight,
            width: this.popupWidth

        };

        return (
            <span
                style={mainSpanStyle}
            >
                <input
                    style={inputStyle}
                    ref={(e) => {
                        this.inputElement = e
                    }}
                    type="text"
                    value={this.internalValue}
                    onChange={this.handleInputValueChange}
                    onKeyPress={this.handleInputKeyPress}
                    onKeyDown={this.handleInputKeyDown}
                />
                <DraggableResizable
                    bindObject={this}
                    bindHeight="popupHeight"
                    bindWidth="popupWidth"
                    allowResize
                    ref={(e: any) => {
                        if (e) {
                            this.popupElement = e.native;
                            console.log("this.popupElement = e.native", e, e.native)
                        }
                    }}
                    style={popupStyle}
                >
                    это попап
                </DraggableResizable>
            </span>
        );

    }

}