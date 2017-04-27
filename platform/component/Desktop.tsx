import * as React from "react";
import {Component} from "./Component";
import {BaseWindow} from "./BaseWindow";
import {TestWindow1} from "../../app/TestWindow1";

export class Desktop extends Component {

    win1: BaseWindow = new BaseWindow();
    win2: TestWindow1 = new TestWindow1();

    init() {
        if (this.initialized) return;
        super.init();
        this.childrenAdd(this.win1);


        this.childrenAdd(this.win2);
    }


    getReactElement(index?: number | string): JSX.Element | null {
        this.init();

        console.log("getReactElement-desktop");
        return (
            <div key={index} style={{position: "relative", overflow:"auto", height: 700, width: 700, border: "1px solid green"}}>
                это десктоп {new Date().getTime()}
                {this.children.map((child, index) => child.getReactElement(index))}
            </div>);
    }

}