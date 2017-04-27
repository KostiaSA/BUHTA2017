import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";


// export interface IButtonStyle {
//     //headerHeight: number;
//     borderColor: string;
//     backgroundColor: string;
// }
//
// export const DefaultButtonStyle: IButtonStyle = {
//     //headerHeight: 26,
//     borderColor: "lightskyblue",
//     backgroundColor: "white"
//
// };

export class TabPanelItem extends EnabledMixin(
    TextMixin(
        IconMixin(
            Component
        ))) {

    //style: IButtonStyle = DefaultButtonStyle;

    // ------------------------------ getReactElement ------------------------------

}