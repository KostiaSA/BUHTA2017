import * as React from "react";
import * as classNames from "classnames";
import {Component, IComponentRegistration, Компоненты_Панели} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {SplitPanel} from "./SplitPanel";

export function __registerBuhtaComponent__(): IComponentRegistration {
    return {
        category: Компоненты_Панели,
        componentClass: SplitPanelItem,
        image: "vendor/fugue/icons/ui-panel.png",
        title: "SplitPanelItem"
    }
}


export class SplitPanelItem extends Component{

    getToolBoxLabel(): string {
        return __registerBuhtaComponent__().title || super.getToolBoxLabel();
    }

    getDesignerLabel(): string {
        if (this === this.parent.children[0])
            return "Split left panel";
        else if (this === this.parent.children[1])
            return "Split right panel";
        else
            return "? panel";
    }

    getDesignerImage(): string {
        return __registerBuhtaComponent__().image || super.getDesignerImage();
    }

    getDesignerCategory(): string {
        return __registerBuhtaComponent__().category || super.getDesignerCategory();
    }


}