import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";


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
            HeightWidthMixin(
                TextMixin(
                    IconMixin(
                        //     HeightWidthMixin(
                        Component
                    )))))) {

    style: IButtonStyle = DefaultButtonStyle;


    init() {
        if (this.initialized) return;
        super.init();
    }

    protected get height_default(): number | string {
        return 28;
    }

    protected get text_default(): string | JSX.Element {
        return "кнопка";
    }

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
                         style={{marginLeft: 6, marginRight: 0, top: 1, position: "relative"}}/>
                </td>
            );

        let textTag = (
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
        );

        let trTag = (
            <tr>
                {iconTag}
                {textTag}
            </tr>
        );

        // trTag = (
        //     <tr>
        //         {textTag}
        //         {iconTag}
        //     </tr>
        // );

//        {...this.getTopLeftMixinStyle()},
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
                onClick={() => {
                    if (this.onClick && this.enabled)
                        this.onClick({sender: this});
                }}
                className={btnClass}
                disabled={!this.enabled}
                style={mainSpanStyle}>
                <table style={{height: this.height}}>
                    <tbody>
                       {trTag}
                    </tbody>
                </table>
            </span>
        );

    }

}