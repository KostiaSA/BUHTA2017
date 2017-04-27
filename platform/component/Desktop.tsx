import * as React from "react";
import {Component} from "./Component";
import {BaseWindow} from "./BaseWindow";
import {TestWindow1} from "../../app/TestWindow1";
import {appStateforceUpdate} from "../util/appStateforceUpdate";

export class Desktop extends Component {

    win1: BaseWindow = new BaseWindow();
    win2: TestWindow1 = new TestWindow1();

    init() {
        if (this.initialized) return;
        super.init();
        this.childrenAdd(this.win1);
        this.childrenAdd(this.win2);
    }

    bringWindowToFront(win: BaseWindow) {
        if (this.children.slice(-1)[0] !== win) {
            this.children = [...this.children.filter((item) => item !== win), win];
            appStateforceUpdate();
        }
    }

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();

        console.log("getReactElement-desktop");
        return (
            <div key={index}
                 style={{position: "relative", overflow: "auto", height: 900, width: 900, border: "1px solid green"}}>
                это десктоп {new Date().getTime()}
                {this.children.map((child, index) => child.getReactElement(index))}
            </div>);
    }

}