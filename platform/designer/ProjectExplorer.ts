import * as React from "react";
import {BaseWindow} from "../component/BaseWindow";
import {Button} from "../component/Button";
import {TabPanel} from "../component/TabPanel";
import {TabPanelItem} from "../component/TabPanelItem";
import {Input} from "../component/input/Input";
import {StringArrayComboBoxDataSource} from "../component/input/StringArrayComboBoxDataSource";
import {DesignerTreeDataTable} from "./DesignerTreeDataTable";
import {Grid} from "../component/Grid";
import {TestWindow2} from "../../app/TestWindow2";
import {Project} from "./project/Project";
import {ProjectDataTable} from "./project/ProjectDataTable";


export class ProjectExplorer extends BaseWindow {
    //=== BEGIN-DESIGNER-DECLARE-CODE ===//
    input1: Input;

    grid: Grid;

    but1: Button;

    //=== END-DESIGNER-DECLARE-CODE ===//

    constructor() {
        super();
        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.input1 = new Input();
        this.grid = new Grid();
        this.but1 = new Button();

        this.top = 60;
        this.left = 60;
        this.width = 600;
        this.height = 800;

        this.input1.bindObject = this;
        this.input1.bindProperty = "caption";
        this.input1.top = 50;
        this.input1.left = 10;

        let a = ["Москва", "Воронеж"];

        for (let i = 1000; i < 2019; i++) {
            a.push("город" + i.toString());
        }
        this.input1.lookupDataSource = new StringArrayComboBoxDataSource(a);

        this.childrenAdd(this.input1);

        this.but1.text = "кнопка";
        this.but1.icon = "vendor/fugue/icons-shadowless/application-blue.png";
        this.but1.top = 10;
        this.but1.left = 10;
        this.but1.onClick = (sender) => {
            let p = new Project();
            p.load();

            let t = new ProjectDataTable();
            t.project = p;
            t.hideColumnHeaders = true;
            t.sizeColumnsToFit = true;
            // t.getRows().then((rows) => {
            //     console.log("rows", rows)
            // });
            t.onRowEditKeyPress=(args)=>{
                console.log("==============this.fireEvent(this.onRowEditKeyPress");

            };

            this.grid.dataSource = t;
            this.grid.loadData();
        };
        this.childrenAdd(this.but1);

        this.grid.top = 100;
        this.grid.left = 5;
        this.grid.right = 5;
        this.grid.bottom = 5;
        this.childrenAdd(this.grid);

        //=== END-DESIGNER-INIT-CODE ===//
    }


}


