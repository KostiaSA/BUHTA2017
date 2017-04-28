import * as React from "react";
import {HTMLProps} from "react";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";


export class Span extends React.Component<HTMLProps<any>, any> {

    componentDidMount() {
    }

    render(): any {
        console.log("Span render");

        let props:any={};
        for (let propName of Object.keys(this.props)){
            if (propName!=="children" && propName!=="ref")
                props[propName]=(this.props as any)[propName];
        }

        return (
            <span {...props}>
                {this.props.children}
            </span>
        )

    }
}