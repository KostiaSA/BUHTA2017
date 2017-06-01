import * as React from "react";
import {Component} from "./Component";
import {BaseWindow} from "./BaseWindow";
import {TestWindow1} from "../../app/TestWindow1";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {TestWindow2} from "../../app/TestWindow2";
import {DesignerWindow} from "../designer/DesignerWindow";

export class Desktop extends Component {

    win1: BaseWindow = new BaseWindow();
    win2: TestWindow2 = new TestWindow2();
    win3: TestWindow1 = new TestWindow1();
    designerWindow: DesignerWindow = new DesignerWindow();
    //win5: DesignerWindow = new DesignerWindow();
    //win6: DesignerWindow = new DesignerWindow();

    init() {
        if (this.initialized) return;
        super.init();
        // this.childrenAdd(this.win1);
        // this.childrenAdd(this.win2);
        this.childrenAdd(this.win3);

        this.designerWindow.designedComponentPath="app/TestWindow2.ts";
        this.childrenAdd(this.designerWindow);
        //this.childrenAdd(this.win5);
        //this.childrenAdd(this.win6);
    }

    bringWindowToFront(win: BaseWindow) {
        if (this.children.slice(-1)[0] !== win) {
            this.children = [...this.children.filter((item) => item !== win), win];
            this.refreshApp();
        }
    }

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();

        console.log("getReactElement-desktop");
        return (
            <div key={index}
                 style={{position: "relative", overflow: "auto", height: 900, width: 900, border: "1px solid green"}}>
                это десктоп {new Date().getTime()}
                {this.children.map((child, index) => <ComponentAsReactElement component={child} key={index}> </ComponentAsReactElement> )}
            </div>);
    }

}