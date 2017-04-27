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

    // getReactElement(index?: number | string): JSX.Element | null {
    //     this.init();
    //     console.log("TabPanel-getReactElement()", this.enabled);
    //
    //     let panelClass = classNames({
    //         "buhta-tab-panel": true,
    //     });
    //
    //     let tabs = <div style={{flex: "0 1 auto",border: "1px solid orange"}}>tabs</div>;
    //     let content = <div style={{flex: "1 1 auto",border: "1px solid green"}}>content</div>;
    //
    //     return (
    //         <div
    //             className={panelClass}
    //             style={{
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 position: this.top || this.left ? "absolute" : "relative",
    //                 top: this.top,
    //                 left: this.left,
    //                 height: this.height,
    //                 width: this.width,
    //                 overflow: "hidden",
    //                 border: "1px solid red"
    //         }}>
    //             {tabs}
    //             {content}
    //         </div>
    //     );
    //
    // }

}