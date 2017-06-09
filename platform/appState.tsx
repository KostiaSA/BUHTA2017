import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppWindow} from "./component/AppWindow";
import {ComponentAsReactElement} from "./react/ComponentAsReactElement";


export function getAppState(): AppState {
    if (!(window as any)["appState"])
        (window as any)["appState"] = new AppState();
    return (window as any)["appState"];
}

export class AppState {

    appWindow: AppWindow;

    start() {
        this.appWindow = new AppWindow();
        ReactDOM.render(
            <ComponentAsReactElement
                component={this.appWindow}
                key={0}>
            </ComponentAsReactElement>,
            document.getElementById("content"));
    }

}
