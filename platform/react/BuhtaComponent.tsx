import * as React from "react";
import {HTMLProps} from "react";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {Component} from "../component/Component";


export interface IBuhtaComponentProps {
    component: Component;
    key: string | number;
}

export class BuhtaComponent extends React.Component<IBuhtaComponentProps, any> {

    componentDidMount() {
    }

    render(): any {
        //console.log("BuhtaComponent render");
        (this.props.component as any).buhtaComponentInstance=this;
        return this.props.component.getReactElement();
    }
}