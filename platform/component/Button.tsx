import * as React from "react";
import * as classNames from "classnames";
import {Component, IComponentRegistration, Компоненты_Кнопки} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {CSSProperties, SyntheticEvent} from "react";
import {DraggableResizable} from "../react/DraggableResizable";
import {ComponentWrapper} from "../react/ComponentWrapper";
import {isFunction} from "util";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Кнопки,
        componentClass: Button,
        image: "vendor/fugue/icons/ui-button.png",
        title: "Button"
    }
}


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

    getToolBoxLabel(): string {
        return __registerBuhtaComponent__().title || super.getToolBoxLabel();
    }

    getDesignerLabel(): string {
        return __registerBuhtaComponent__().title || super.getDesignerLabel();
    }

    getDesignerImage(): string {
        return __registerBuhtaComponent__().image || super.getDesignerImage();
    }

    getDesignerCategory(): string {
        return __registerBuhtaComponent__().category || super.getDesignerCategory();
    }


    style: IButtonStyle = DefaultButtonStyle;


    protected get height_default(): number | string {
        return 28;
    }

    protected get text_default(): string | JSX.Element {
        return "кнопка";
    }

    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        //console.log("Button-getReactElement()", this.enabled);

        let btnClass = classNames({
            "buhta-button": !this.designMode,
            "buhta-button-design-mode": this.designMode,
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
                    cursor: this.enabled && !this.designMode ? "pointer" : "default",
                }}
                >
                    {this.designMode ? "$" + this.text : this.text}
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
        let mainSpanStyle: CSSProperties = {
            ...this.getTopLeftMixinStyle(),
            overflow: "hidden",
            padding: 0,
            whiteSpace: "nowrap",
            width: this.width,
            cursor: this.enabled && !this.designMode ? "pointer" : "default",
        };


        // let buttonSpan = (
        //     <span
        //         onClick={(e: SyntheticEvent<any>) => {
        //             if (this.onClick && this.enabled)
        //                 this.onClick({sender: this});
        //         }}
        //         className={btnClass}
        //         disabled={!this.enabled}
        //         style={mainSpanStyle}>
        //         <table style={{height: this.height}}>
        //             <tbody>
        //                {trTag}
        //             </tbody>
        //         </table>
        //     </span>
        // );

//        if (this.designMode)
        return (
            <ComponentWrapper
                component={this}
                key={this.id}
                className={btnClass}
                disabled={!this.enabled}
                style={mainSpanStyle}
                onClick={() => {
                    if (isFunction(this.onClick)) {
                        this.onClick({sender: this});
                    }
                }}
            >
                <table style={{height: this.height}}>
                    <tbody>
                    {trTag}
                    </tbody>
                </table>
            </ComponentWrapper>
        );
        // else
        //     return buttonSpan;


    }

}