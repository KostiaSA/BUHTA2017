import * as React from "react";
import * as ReactDOM from "react-dom";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {getRandomId} from "../util/getRandomId";
import {ReactComponent} from "../react/ReactComponent";
import {appState} from "../appState";
import {IComponentDesigner} from "../designer/DesignerWindow";
//import {BaseWindow} from "./BaseWindow";
//import {AppWindow} from "./AppWindow";


export interface IEventArgs {
    sender: Component;
}

export interface IEvent<TArgs extends IEventArgs> {
    (args: TArgs): void;
}


export class Component {//} extends React.Component<any, any>{


    _id: string;
    get id(): string {
        if (!this._id) {
            this._id = getRandomId()
        }
        return this._id;
    }


    // --- parent ---
    _parent: Component;
    get parent(): Component {
        return this._parent;
    }

    set parent(value: Component) {
        this._parent = value;
    }

    // --- designMode ---
    _designMode: boolean;
    get designMode(): boolean {
        if (this._designMode)
            return true;
        else if (this.parent)
            return this.parent.designMode;
        else
            return false;
    }

    set designMode(value: boolean) {
        this._designMode = value;
    }

    get designer(): IComponentDesigner {
        if ((this as any as IComponentDesigner).isComponentDesignerImplementer)
            return (this as any as IComponentDesigner);
        else if (this.parent)
            return this.parent.designer;
        else
            return undefined as any;
    }

    initialized: boolean;

    init() {
        this.initialized = true;
    }

    native: HTMLElement;

    children: Component[] = [];

    childrenAdd(child: Component) {
        if (this.children.indexOf(child) > -1)
            throw "ошибка childrenAdd: двойное добавление";
        child.parent = this;
        this.children.push(child);
    }

    // для рендеринга children
    // _$childrenContainer: JQuery;
    // get $childrenContainer(): JQuery {
    //     return this._$childrenContainer || this.$;
    // }
    //
    // set $childrenContainer(value: JQuery) {
    //     this._$childrenContainer = value;
    // }

    setPropertyWithForceUpdate(propName: string, value: any) {
        let needUpdate = (this as any)[propName] !== value;
        (this as any)[propName] = value;
        this.refresh(needUpdate);
    }

    // --- owner ---
    get owner(): Component {
        if (!this.parent)
            return this;
        else {
            if (this.parent.constructor.name === "FormDesigner_Panel")
                return this;
            else
                return this.parent.owner;
        }
    }

    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        return null;
    }

    refresh(needForceUpdate: boolean = true) {
        if (needForceUpdate) {
            if (this.buhtaComponentInstance)
                this.buhtaComponentInstance.forceUpdate();
            else
                this.refreshParent();
        }
    }

    refreshParent(needForceUpdate: boolean = true) {
        if (needForceUpdate) {
            let parent = this.parent;
            while (parent) {
                if (parent.buhtaComponentInstance) {
                    parent.buhtaComponentInstance.forceUpdate();
                    return;
                }
                parent = parent.parent;
            }
        }
    }

    refreshWindow(needForceUpdate: boolean = true) {
        if (needForceUpdate) {
            let parent = this.parent;
            let BaseWindow = require("./BaseWindow");
            while (parent) {
                if (parent.buhtaComponentInstance && parent instanceof BaseWindow) {
                    parent.buhtaComponentInstance.forceUpdate();
                    return;
                }
                parent = parent.parent;
            }
        }
    }

    refreshApp(needForceUpdate: boolean = true) {
        if (needForceUpdate && appState && appState.appWindow && appState.appWindow.buhtaComponentInstance) {
            appState.appWindow.buhtaComponentInstance.forceUpdate();
        }
    }

    afterRender(isFirstRender: boolean) {

    }


    buhtaComponentInstance: ReactComponent;

}