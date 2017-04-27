import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {DraggableResizable} from "../react/DraggableResizable";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {appStateforceUpdate} from "../util/appStateforceUpdate";


export interface IButtonStyle {
    //headerHeight: number;
    borderColor: string;
    backgroundColor: string;
}

export const DefaultButtonStyle: IButtonStyle = {
    //headerHeight: 26,
    borderColor: "lightskyblue",
    backgroundColor: "white"

};

export class Button extends EnabledMixin(
    OnClickMixin(
        // TopLeftMixin(
        //     HeightWidthMixin(
        Component
    )) {

    style: IButtonStyle = DefaultButtonStyle;


    init() {
        if (this.initialized) return;
        super.init();
    }

    top: number = 50;
    left: number = 50;
    height: number = 300;
    width: number = 400;
    //text: ;

    // ------------------------------ text ------------------------------
    protected _text: string | JSX.Element = this.text_default;
    get text(): string | JSX.Element {
        return this._text;
    }

    set text(value: string | JSX.Element) {
        let needUpdate = this._text !== value;
        this._text = value;
        appStateforceUpdate(needUpdate);
    }

    protected get text_default(): string | JSX.Element {
        return "кнопка";
    }

    // emitCode_text(code: EmittedCode) {
    //     code.emitBooleanValue(this, "text", true);
    // }


    icon: string = "vendor/fugue/icons-shadowless/application-blue.png";

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        console.log("Button-getReactElement()", this.enabled);

        let btnClass = classNames({
            "buhta-button": true,
            "disabled": !this.enabled,
        });

        return (
            <span
                onClick={() => {
                    if (this.onClick && this.enabled)
                        this.onClick({sender: this});
                }}
                className={btnClass}
                disabled={!this.enabled}
                style={{
                    position: "relative",
                    top: this.top,
                    left: this.left,
                    overflow: "hidden",
                    padding: 8,
                    whiteSpace: "nowrap",
                    cursor: this.enabled ? "pointer" : "default",
                }}>
                    <img src={this.icon} height="16" width="16" style={{position: "relative", top: 2}}/>
                    <span style={{
                        position: "relative",
                        whiteSpace: "nowrap",
                        marginLeft: 6,
                        top: -1,
                        marginRight: 1,
                        cursor: this.enabled ? "pointer" : "default",
                    }}
                    >
                      {this.text}
                    </span>
            </span>
        );
    }

}