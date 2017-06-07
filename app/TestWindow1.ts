import * as React from "react";
import {BaseWindow} from "../platform/component/BaseWindow";
import {Button} from "../platform/component/Button";
import {TabPanel} from "../platform/component/TabPanel";
import {TabPanelItem} from "../platform/component/TabPanelItem";
import {Input} from "../platform/component/input/Input";
import {StringArrayComboBoxDataSource} from "../platform/component/input/StringArrayComboBoxDataSource";
import {DesignerTreeDataTable} from "../platform/designer/DesignerTreeDataTable";
import {Grid} from "../platform/component/Grid";
import {TestWindow2} from "./TestWindow2";


export class TestWindow1 extends BaseWindow {
    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    input1: Input;

    grid1: Grid;

    but1: Button;
    but2: Button;
    tabs: TabPanel;
    tab1: TabPanelItem;
    tab2: TabPanelItem;
    tab3: TabPanelItem;

    but1onTab1: Button = new Button();
    //=== END-DESIGNER-DECLARE-CODE ===//

    constructor() {
        super();
        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.input1= new Input();
        this.grid1= new Grid();
        this.but1 = new Button();
        this.but2 = new Button();
        this.tabs = new TabPanel();
        this.tab1 = new TabPanelItem();
        this.tab2 = new TabPanelItem();
        this.tab3 = new TabPanelItem();
        this.but1onTab1 = new Button();

        this.top = 60;
        this.left = 60;
        this.width = 600;
        this.height = 800;

        this.input1.bindObject = this;
        this.input1.bindProperty = "caption";
        this.input1.top = 50;
        this.input1.left = 10;

        // let a=[{value:"1",title:"Москва"},{value:"2",title:"Воронеж"},];
        // for (let i=1000; i<1019; i++){
        //     a.push({value:i.toString(),title:"город"+i.toString()});
        // }
        let a=["Москва","Воронеж"];

        for (let i=1000; i<2019; i++){
            a.push("город"+i.toString());
        }
        this.input1.lookupDataSource=new StringArrayComboBoxDataSource(a);

        this.childrenAdd(this.input1);

        this.but1.text = "кнопка";
        this.but1.icon = "vendor/fugue/icons-shadowless/application-blue.png";
        this.but1.top = 10;
        this.but1.left = 10;
        this.but1.onClick = (sender) => {
            console.log("click");
            this.but1.text += "*";

            this.grid1.loadData();

            // let x=new DesignerTreeDataTable();
            // x.designedComponent=this;
            // x.getRows().then((rows)=>{
            //     console.log("DesignerTreeDataTable",rows);
            // });

            //this.but1.enabled = false;
        };
        this.childrenAdd(this.but1);

        this.grid1.top = 100;
        this.grid1.left = 10;
        this.grid1.right = 10;
        this.grid1.bottom = 10;

        let ds=new DesignerTreeDataTable();
        ds.designedComponent=new TestWindow2();
        this.grid1.dataSource=ds;
        this.childrenAdd(this.grid1);


        this.but2.top = 10;
        this.but2.right = 25;
        this.but2.text = "жми меня сильно";
        this.but2.enabled = false;
        this.childrenAdd(this.but2);

        this.tabs.top = 100;
        this.tabs.left = 10;
        this.tabs.right = 10;
        this.tabs.bottom = 10;
        //this.childrenAdd(this.tabs);

        this.tab1.text = "закладка 1";
        this.tab1.icon = "vendor/fugue/icons-shadowless/user.png";
        this.tabs.childrenAdd(this.tab1);

        this.tab2.text = "закладка 2";
        this.tab2.icon = "vendor/fugue/icons-shadowless/cross.png";
        this.tabs.childrenAdd(this.tab2);

        this.tab3.text = "выход";
        this.tab3.icon = "vendor/fugue/icons-shadowless/ui-label-link.png";
        this.tabs.childrenAdd(this.tab3);

        this.but1onTab1.top = 10;
        this.but1onTab1.left = 10;
        this.but1onTab1.text = "but1onTab1";
        //this.but1onTab1.enabled = false;
        this.tab1.childrenAdd(this.but1onTab1);

        //=== END-DESIGNER-INIT-CODE ===//
    }

    caption:string="это caption";





}


