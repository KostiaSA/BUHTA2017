import * as React from "react";
import * as ReactDOM from "react-dom";

import {Component} from "./Component";
import {Desktop} from "./Desktop";

export class AppWindow extends React.Component<any, any> {

    desktop: Desktop = new Desktop();

    initialized:boolean=false;

    init() {
        if (this.initialized) return;
    }

    componentDidMount() {
        let appState= require("../appState").appState;
        appState.appWindow=this;
         // setInterval(() => {
         //     this.forceUpdate()
         // }, 1000);

    }


    render(): any {
        console.log("App render2");

        this.init();

        return (
            <div style={{height: "97%", width: "97%", border: "1px solid red"}}>
                привет AppWindow! {new Date().getTime()}
                {this.desktop.getReactElement()}
            </div>
        )

    }
}