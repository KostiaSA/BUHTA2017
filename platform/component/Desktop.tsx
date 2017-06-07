import * as React from "react";
import {Component} from "./Component";
import {BaseWindow} from "./BaseWindow";
import {TestWindow1} from "../../app/TestWindow1";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
//import {TestWindow2} from "../../app/TestWindow2";
import {DesignerWindow} from "../designer/DesignerWindow";

export class Desktop extends Component {

    win1: BaseWindow;
    win3: TestWindow1;
    designerWindow: DesignerWindow;

    constructor() {
        super();
        this.win1 = new BaseWindow();
        this.win3 = new TestWindow1();
        this.designerWindow = new DesignerWindow();

        // this.childrenAdd(this.win1);
        // this.childrenAdd(this.win2);

        this.designerWindow.designedComponentPath="app/TestWindow2.ts";
//        this.designerWindow.designedComponentPath="platform/designer/DesignerWindow.tsx";
        this.childrenAdd(this.designerWindow);
        //this.childrenAdd(this.win5);
        //this.childrenAdd(this.win6);

        this.childrenAdd(this.win3);
    }


    bringWindowToFront(win: BaseWindow) {
        if (this.children.slice(-1)[0] !== win) {
            this.children = [...this.children.filter((item) => item !== win), win];
            this.refreshApp();
        }
    }

    getReactElement(index?: number | string): JSX.Element | null {

        console.log("getReactElement-desktop");
        return (
            <div key={index}
                 style={{position: "relative", overflow: "auto", height: 900, width: 900, border: "1px solid green"}}>
                это десктоп {new Date().getTime()}
                {this.children.map((child, index) => <ComponentAsReactElement component={child} key={index}> </ComponentAsReactElement> )}
            </div>);
    }

}