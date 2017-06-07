import * as React from "react";
import * as classNames from "classnames";
import {Component, IComponentRegistration, Компоненты_Панели} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {SplitPanelItem} from "./SplitPanelItem";
import {SnapGrid} from "../react/SnapGrid";
import {DraggableResizable} from "../react/DraggableResizable";
import {SyntheticEvent} from "react";
import {ComponentWrapper} from "../react/ComponentWrapper";
let SplitterLayout = require("react-splitter-layout").default;

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

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: SplitPanel,
        image: "vendor/fugue/icons/ui-split-panel.png",
        title: "SplitPanel"
    }
}


export class SplitPanel extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {


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


    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("SplitPanel-getReactElement()", this.enabled);

        let panelClass = classNames({
            "buhta-split-panel": true,
        });

        let itemsContent: JSX.Element[] = [];

        let snapGrid: any = null;
        if (this.designMode)
            snapGrid = <SnapGrid/>;

        for (let child of this.children) {
            let panelItem = child as SplitPanelItem;


            itemsContent.push(
                <div style={{
                    overflow: "auto",
                    height: "100%",
                    backgroundColor: "white"
                    //border: "1px solid red"
                }}>
                    {snapGrid}
                    {panelItem.children.map((child, index) =>
                        <ComponentAsReactElement
                            component={child}
                            key={index}>
                        </ComponentAsReactElement>)}
                </div>
            )


        }

        return (
            <ComponentWrapper
                component={this}
                key={this.id}
                disabled={!this.enabled}
                className={panelClass}
                style={{
                    ...this.getTopLeftMixinStyle(),
                    ...this.getHeightWidthMixinStyle(),
                    overflow: "hidden",
                    border: "1px solid silver",
                }}>
                <SplitterLayout secondaryInitialSize={150}>
                    {itemsContent}
                </SplitterLayout>
            </ComponentWrapper>
        );

    }

}