import * as React from "react";
import * as classNames from "classnames";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {EnabledMixin} from "../component/mixin/EnabledMixin";
import {TopLeftMixin} from "../component/mixin/TopLeftMixin";
import {HeightWidthMixin} from "../component/mixin/HeightWidthMixin";
import {Component} from "../component/Component";
import {DesignerWindow} from "./DesignerWindow";
import {SnapGrid} from "../react/SnapGrid";
let SplitterLayout = require("react-splitter-layout").default;


export class DesignerSurfacePanel extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {

    designerWindow: DesignerWindow;


    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("DesignerSurfacePanel-getReactElement()", this.enabled);

        let panelClass = classNames({
            "buhta-designer-surface-panel": true,
        });

        let children: JSX.Element[] = [];
        if (this.designerWindow.designedComponent) {
            children = this.designerWindow.designedComponent.children.map((child, index) =>
                <ComponentAsReactElement
                    component={child}
                    key={index}>
                </ComponentAsReactElement>);
        }

        return (
            <div
                className={panelClass}
                style={{
                    ...this.getTopLeftMixinStyle(),
                    ...this.getHeightWidthMixinStyle(),
                    overflow: "auto",
                    border: "1px solid silver"
                }}>
                это DesignerSurfacePanel {new Date().getTime()}
                <SnapGrid/>
                {children}
            </div>
        );

    }

}