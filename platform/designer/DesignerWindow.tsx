import * as React from "react";
import {BaseWindow} from "../component/BaseWindow";
import {TabPanel} from "../component/TabPanel";
import {TabPanelItem} from "../component/TabPanelItem";
import {SplitPanel} from "../component/SplitPanel";
import {SplitPanelItem} from "../component/SplitPanelItem";
import {Button} from "../component/Button";
import {DesignerSurfacePanel} from "./DesignerSurfacePanel";
import {Component} from "../component/Component";
import {TestWindow1} from "../../app/TestWindow1";
import {TestWindow2} from "../../app/TestWindow2";


export class DesignerWindow extends BaseWindow {


    tabs: TabPanel = new TabPanel();
    designerTab: TabPanelItem = new TabPanelItem();
    codeTab: TabPanelItem = new TabPanelItem();

    designerSplitPanel: SplitPanel = new SplitPanel();
    designerSurface: SplitPanelItem = new SplitPanelItem();
    designerPropertyEditor: SplitPanelItem = new SplitPanelItem();

    but1: Button = new Button();

    surface: DesignerSurfacePanel = new DesignerSurfacePanel();


    // ------------------------------ designedComponent ------------------------------
    protected _designedComponent: Component;
    get designedComponent(): Component {
        return this._designedComponent;
    }

    set designedComponent(value: Component) {
        this.setPropertyWithForceUpdate("_designedComponent", value);
    }


    init() {
        if (this.initialized) return;
        super.init();

        this.top = 10;
        this.left = 10;
        this.width = 800;
        this.height = 800;

        this.tabs.top = 100;
        this.tabs.left = 10;
        this.tabs.right = 10;
        this.tabs.bottom = 10;
        this.childrenAdd(this.tabs);

        this.designerTab.text = "Дизайнер";
        this.designerTab.icon = "vendor/fugue/icons-shadowless/user.png";
        this.tabs.childrenAdd(this.designerTab);

        this.codeTab.text = "Код";
        this.codeTab.icon = "vendor/fugue/icons-shadowless/cross.png";
        this.tabs.childrenAdd(this.codeTab);

        this.designerSplitPanel.top = 10;
        this.designerSplitPanel.left = 10;
        this.designerSplitPanel.right = 10;
        this.designerSplitPanel.bottom = 10;

        this.designerSplitPanel.childrenAdd(this.designerSurface);
        this.designerSplitPanel.childrenAdd(this.designerPropertyEditor);

        this.designerTab.childrenAdd(this.designerSplitPanel);


        this.but1.text = "это surface";
        this.but1.top = 10;
        this.but1.left = 10;

        this.surface.top = 10;
        this.surface.left = 10;
        this.surface.right = 10;
        this.surface.bottom = 10;
        this.surface.designerWindow = this;
        this.designerSurface.childrenAdd(this.surface);

        this.designedComponent = new TestWindow2();
        this.designedComponent.designMode = true;
        this.designedComponent.init();
    }


}