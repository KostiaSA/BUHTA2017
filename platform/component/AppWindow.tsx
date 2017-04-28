import * as React from "react";
import * as ReactDOM from "react-dom";

import {Component} from "./Component";
import {Desktop} from "./Desktop";
import {observer} from "mobx-react";
import {BuhtaComponent} from "../react/BuhtaComponent";


export class AppWindow extends Component {

    desktop: Desktop = new Desktop();

    initialized:boolean=false;

    init() {
        if (this.initialized) return;
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
        console.log("App render2");

        this.init();

        return (
            <div style={{height: "97%", width: "97%", border: "1px solid red"}}>
                привет AppWindow! {new Date().getTime()}
                <BuhtaComponent component={this.desktop} key={0}></BuhtaComponent>
            </div>
        )

    }
}