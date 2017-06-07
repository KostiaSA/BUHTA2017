import * as React from "react";
import * as classNames from "classnames";
import {Component, IComponentRegistration, Компоненты_Панели} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {VisibleMixin} from "./mixin/VisibleMixin";


export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: TabPanelItem,
        image: "vendor/fugue/icons/ui-panel.png",
        title: "TabPanelItem"
    }
}

export class TabPanelItem extends EnabledMixin(
    VisibleMixin(
        TextMixin(
            IconMixin(
                Component
            )))) {

    getToolBoxLabel(): string {
        return __registerBuhtaComponent__().title || super.getToolBoxLabel();
    }

    getDesignerLabel(): string {
        if (this.text)
            return "Tab: " + this.text;
        else
            return "Tab";
    }

    getDesignerImage(): string {
        return __registerBuhtaComponent__().image || super.getDesignerImage();
    }

    getDesignerCategory(): string {
        return __registerBuhtaComponent__().category || super.getDesignerCategory();
    }

}