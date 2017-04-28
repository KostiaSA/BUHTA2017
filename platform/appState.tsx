import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppWindow} from "./component/AppWindow";
import {ReactComponent} from "./react/ReactComponent";

export class AppState {

    appWindow: AppWindow;

    startApp() {
        this.appWindow = new AppWindow();
        //ReactDOM.render(<AppWindow/>, document.getElementById("content"));
        ReactDOM.render(<ReactComponent component={this.appWindow}
                                        key={0}></ReactComponent>, document.getElementById("content"));
    }

    // forceUpdate() {
    //     if (this.appWindow)
    //         this.appWindow.forceUpdate();
    //
    // }
}

export let appState = new AppState();
setTimeout(() => {
    appState.startApp();

}, 100);
