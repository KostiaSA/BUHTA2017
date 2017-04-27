import * as React from "react";
import * as ReactDOM from "react-dom";


export interface IEventArgs {
    sender: Component;
}

export interface IEvent<TArgs extends IEventArgs> {
    (args: TArgs): void;
}


export class Component {

    // --- parent ---
    _parent: Component;
    get parent(): Component {
        return this._parent;
    }

    set parent(value: Component) {
        this._parent = value;
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

}