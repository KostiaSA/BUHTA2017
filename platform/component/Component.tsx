import * as React from "react";
import * as ReactDOM from "react-dom";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {getRandomId} from "../util/getRandomId";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {appState} from "../appState";
import {IComponentDesigner} from "../designer/DesignerWindow";
import {EmittedCode} from "../designer/EmittedCode";
import {getAllObjectProps} from "../util/getAllObjectProps";
import {isFunction, isString} from "util";
//import {BaseWindow} from "./BaseWindow";
//import {AppWindow} from "./AppWindow";


export interface IEventArgs {
    sender: Component;
}

export interface IEvent<TArgs extends IEventArgs> {
    (args: TArgs): void;
}

export const Компоненты_Кнопки = "Кнопки";
export const Компоненты_Данные = "Данные";
export const Компоненты_Панели = "Панели";
export const Компоненты_Списки = "Списки";
export const Компоненты_Редакторы = "Редакторы";
export const Компоненты_Окна = "Окна";

export const ComponentCategories = [
    Компоненты_Кнопки,
    Компоненты_Данные,
    Компоненты_Панели,
    Компоненты_Списки,
    Компоненты_Редакторы,
    Компоненты_Окна,
];

export interface IComponentRegistration {
    category: string;
    componentClass: Function;
    image?: string;
    title?: string;
}

export class Component {//} extends React.Component<any, any>{

    constructor(){

    }


    getToolBoxLabel(): string {
        return this.constructor.name;
    }

    getDesignerLabel(): string {
        return this.constructor.name;
    }

    getDesignerImage(): string {
        return "vendor/fugue/icons/puzzle.png";
    }

    getDesignerCategory(): string {
        return "КОМПОНЕНТЫ";
    }

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

    _designer: IComponentDesigner;
    get designer(): IComponentDesigner {
        if (this._designer)
            return this._designer;
        else if (this.parent)
            return this.parent.designer;
        else
            return undefined as any;
    }

    set designer(value: IComponentDesigner) {
        this._designer = value;
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
            if (this.parent.constructor.name === "Desktop") {
                return this;
            }
            else
                return this.parent.owner;
        }
    }

    getReactElement(index?: number | string): JSX.Element | null {
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

    get name(): string {
        for (let propName of Object.keys(this.owner)) {
            if ((this.owner as any)[propName] === this)
                return propName;
        }

        if (this.owner === this)
            return this.constructor.name;

        console.error("ошибка платформы Component.get name() for " + this.constructor.name, this, this.owner);
        return "ошибка_" + this.constructor.name;
    }

    emitCode(code: EmittedCode) {

        for (let propName of getAllObjectProps(this)) {
            if (propName.startsWith("__emitCode_")) {
                ((this as any)[propName]).call(this, code);
            }
        }

        this.children.forEach((child: Component, index: number) => {
            //console.log(child.constructor.name);
            code.emitDeclaration(child.name, child.constructor.name);
            code.emitCreate(child.name, child.constructor.name);
            child.emitCode(code);
            if (this === this.owner)
                code.inits.push("        " + "this.childrenAdd(this." + child.name + ");");
            else
                code.inits.push("        " + "this." + this.name + ".childrenAdd(this." + child.name + ");");
        });
    }

    buhtaComponentInstance: ComponentAsReactElement;

    fireEvent(func: any, args: any) {
        if (isString(func)) {
            if (!(this.owner as any)[func]) {
                console.error("ошибка Component.fireEvent(): function '" + func + "' not found, " + this.constructor.name, this, this.owner);

            }
            else {
                args.sender = this;
                (this.owner as any)[func](args);
            }
        }
        else if (isFunction(func)) {
            args.sender = this;
            func(args);
        }
        else {
            console.error("ошибка Component.fireEvent():'func' must be string or function " + this.constructor.name, this, this.owner);
        }
    }

}