import * as React from "react";
import {Component} from "./Component";
import {BaseWindow} from "./BaseWindow";
import {TestWindow1} from "../../app/TestWindow1";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ReactComponent} from "../react/ReactComponent";
import {TestWindow2} from "../../app/TestWindow2";
import {DesignerWindow} from "../designer/DesignerWindow";

export class Desktop extends Component {

    win1: BaseWindow = new BaseWindow();
    win2: TestWindow2 = new TestWindow2();
    win3: TestWindow1 = new TestWindow1();
    win4: DesignerWindow = new DesignerWindow();

    init() {
        if (this.initialized) return;
        super.init();
        // this.childrenAdd(this.win1);
        // this.childrenAdd(this.win2);
        // this.childrenAdd(this.win3);
        this.childrenAdd(this.win4);
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
                {this.children.map((child, index) => <ReactComponent component={child} key={index}> </ReactComponent> )}
            </div>);
    }

}