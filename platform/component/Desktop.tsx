import * as React from "react";
import {Component} from "./Component";
import {Window} from "./Window";

export class Desktop extends Component {

    win1: Window = new Window();

    init() {
        if (this.initialized) return;
        super.init();
        this.childrenAdd(this.win1);
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