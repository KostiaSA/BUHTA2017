import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppWindow} from "./component/AppWindow";

export class AppState {

    appWindow: AppWindow;

    startApp() {
        ReactDOM.render(<AppWindow/>, document.getElementById("content"));
    }

    forceUpdate() {
        if (this.appWindow)
            this.appWindow.forceUpdate();

    }
}

export let appState = new AppState();
setTimeout(()=>{
    appState.startApp();

},100);
