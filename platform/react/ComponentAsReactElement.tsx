import * as React from "react";
import {HTMLProps} from "react";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {Component} from "../component/Component";


export interface IComponentAsReactElementProps {
    component: Component;
    key: string | number;
}

export class ComponentAsReactElement extends React.Component<IComponentAsReactElementProps, any> {

    componentDidMount() {
        this.props.component.afterRender(true);
    }

    componentDidUpdate() {
        this.props.component.afterRender(false);
    }

    render(): any {
        //console.log("ComponentAsReactElement render");
        (this.props.component as any).buhtaComponentInstance=this;
        return this.props.component.getReactElement();
    }
}