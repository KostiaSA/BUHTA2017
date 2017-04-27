import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {DraggableResizable} from "../react/DraggableResizable";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";


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
        TopLeftMixin(
            TextMixin(
                IconMixin(
                    //     HeightWidthMixin(
                    Component
                ))))) {

    style: IButtonStyle = DefaultButtonStyle;


    init() {
        if (this.initialized) return;
        super.init();
    }

    height: number = 300;
    width: number = 400;


    protected get text_default(): string | JSX.Element {
        return "кнопка";
    }

    // emitCode_text(code: EmittedCode) {
    //     code.emitBooleanValue(this, "text", true);
    // }


    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        console.log("Button-getReactElement()", this.enabled);

        let btnClass = classNames({
            "buhta-button": true,
            "disabled": !this.enabled,
        });

        let iconTag: JSX.Element | null = null;
        if (this.icon)
            iconTag = (
                <td style={{verticalAlign: "middle"}}>
                    <img src={this.icon} height="16" width="16"
                         style={{marginLeft: 6, top: 1, position: "relative"}}/>
                </td>
            );

        return (
            <span
                onClick={() => {
                    if (this.onClick && this.enabled)
                        this.onClick({sender: this});
                }}
                className={btnClass}
                disabled={!this.enabled}
                style={{
                    position: this.top || this.left ? "absolute" : "relative",
                    top: this.top,
                    left: this.left,
                    overflow: "hidden",
                    padding: 0,
                    whiteSpace: "nowrap",
                    cursor: this.enabled ? "pointer" : "default",
                }}>
                <table style={{height: 28}}>
                    <tbody>
                        <tr>
                            {iconTag}
                            <td style={{verticalAlign: "middle"}}>
                                <span style={{
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    marginLeft: 6,
                                    marginRight: 6,
                                    top: -1,
                                    cursor: this.enabled ? "pointer" : "default",
                                }}
                                >
                                    {this.text}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </span>
        );

    }

}