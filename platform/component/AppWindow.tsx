import * as React from "react";
import * as ReactDOM from "react-dom";

import {Component} from "./Component";
import {Desktop} from "./Desktop";
import {observer} from "mobx-react";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";


export class AppWindow extends Component {

    desktop: Desktop;

    constructor() {
        super();
        this.desktop = new Desktop();
    }

    // componentDidMount() {
    //     let appState= require("../appState").appState;
    //     appState.appWindow=this;
    //      // setInterval(() => {
    //      //     this.forceUpdate()
    //      // }, 1000);
    //
    // }


    getReactElement(index?: number | string): JSX.Element | null {
        console.log("App render");

        return (
            <div style={{height: "97%", width: "97%", border: "1px solid red"}}>
                привет AppWindow! {new Date().getTime()}
                <ComponentAsReactElement component={this.desktop} key={0}></ComponentAsReactElement>
            </div>
        )

    }
}