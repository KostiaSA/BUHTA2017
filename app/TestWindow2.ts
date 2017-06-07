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
    splitPanel: SplitPanel;
    splitPanelItem1: SplitPanelItem;
    splitPanelItem2: SplitPanelItem;
    but1onTab1: Button;
    but2onTab1: Button;
    //=== END-DESIGNER-DECLARE-CODE ===//

    constructor() {
        super();
        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.splitPanel = new SplitPanel();
        this.splitPanelItem1 = new SplitPanelItem();
        this.splitPanelItem2 = new SplitPanelItem();
        this.but1onTab1 = new Button();
        this.but2onTab1 = new Button();


        this.top = 60;
        this.left = 60;
        this.width = 600;
        this.height = 800;

        this.splitPanel.top = 10;
        this.splitPanel.left = 10;
        this.splitPanel.right = 10;
        this.splitPanel.bottom = 10;
        this.childrenAdd(this.splitPanel);

        this.splitPanel.childrenAdd(this.splitPanelItem1);

        this.splitPanel.childrenAdd(this.splitPanelItem2);

        this.but1onTab1.top = 10;
        this.but1onTab1.left = 10;
        this.but1onTab1.text = "but1onTab1";
        //this.but1onTab1.enabled = false;
        this.splitPanelItem1.childrenAdd(this.but1onTab1);

        this.but2onTab1.top = 55;
        this.but2onTab1.left = 10;
        this.but2onTab1.text = "but2onTab1-да!";
        //this.but1onTab1.enabled = false;
        this.splitPanelItem1.childrenAdd(this.but2onTab1);
        //=== END-DESIGNER-INIT-CODE ===//
    }

    caption:string="это caption";

}