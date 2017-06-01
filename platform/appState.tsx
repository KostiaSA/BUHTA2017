import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppWindow} from "./component/AppWindow";
import {ComponentAsReactElement} from "./react/ComponentAsReactElement";

export class AppState {

    appWindow: AppWindow;

    startApp() {
        this.appWindow = new AppWindow();
        //ReactDOM.render(<AppWindow/>, document.getElementById("content"));
        ReactDOM.render(<ComponentAsReactElement component={this.appWindow}
                                                 key={0}></ComponentAsReactElement>, document.getElementById("content"));
    }

    // forceUpdate() {
    //     if (this.appWindow)
    //         this.appWindow.forceUpdate();
    //
    // }
}

export let appState = new AppState();
setTimeout(() => {

    //process.env.NODE_ENV = "production";
    appState.startApp();

}, 100);
