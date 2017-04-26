import * as React from "react";
import * as ReactDOM from "react-dom";
import {observable, autorun, Lambda} from "mobx";
import {observer} from "mobx-react";

@observer
export class App extends React.Component<any,any> {


    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    private autorunDisposer: Lambda;

    componentDidMount() {
    };

    componentWillUnmount() {
        console.log("App unmount");
    }

    bodyElement: HTMLElement;
    sidebarElement: HTMLElement;
    pageElement: HTMLElement;

    render(): any {
        console.log("App render");


        return (
            <div>привет медвед!</div>
        )

    }

}

