import * as React from "react";
import {BaseWindow} from "../platform/component/BaseWindow";
import {Button} from "../platform/component/Button";
import {TabPanel} from "../platform/component/TabPanel";
import {TabPanelItem} from "../platform/component/TabPanelItem";
import {Input} from "../platform/component/input/Input";
import {StringArrayComboBoxDataSource} from "../platform/component/input/StringArrayComboBoxDataSource";
import {SplitPanel} from "../platform/component/SplitPanel";
import {SplitPanelItem} from "../platform/component/SplitPanelItem";


export class TestWindow2 extends BaseWindow {
    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    tabs: SplitPanel = new SplitPanel();
    tab1: SplitPanelItem = new SplitPanelItem();
    tab2: SplitPanelItem = new SplitPanelItem();

    but1onTab1: Button = new Button();
    but2onTab1: Button = new Button();
    //=== END-DESIGNER-DECLARE-CODE ===//

    caption:string="это caption";

    init() {
        if (this.initialized) return;
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.top = 60;
        this.left = 60;
        this.width = 600;
        this.height = 800;

        this.tabs.top = 10;
        this.tabs.left = 10;
        this.tabs.right = 10;
        this.tabs.bottom = 10;
        this.childrenAdd(this.tabs);

        this.tabs.childrenAdd(this.tab1);

        this.tabs.childrenAdd(this.tab2);

        this.but1onTab1.top = 10;
        this.but1onTab1.left = 10;
        this.but1onTab1.text = "but1onTab1";
        //this.but1onTab1.enabled = false;
        this.tab1.childrenAdd(this.but1onTab1);

        this.but2onTab1.top = 55;
        this.but2onTab1.left = 10;
        this.but2onTab1.text = "but2onTab1-да!";
        //this.but1onTab1.enabled = false;
        this.tab1.childrenAdd(this.but2onTab1);
        //=== END-DESIGNER-INIT-CODE ===//
    }


}