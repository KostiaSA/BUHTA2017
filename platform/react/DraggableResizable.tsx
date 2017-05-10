import * as React from "react";
import {HTMLProps} from "react";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";


export interface IDraggableResizableProps extends HTMLProps<any> {
    bindObject?: any;
    bindTop?: string;
    bindLeft?: string;
    bindHeight?: string;
    bindWidth?: string;
    allowDragX?: boolean;
    allowDragY?: boolean;
    allowResize?: boolean;
    onDrag?:()=>void;
}


export class DraggableResizable extends React.Component<IDraggableResizableProps, any> {


    componentDidMount() {
        if (this.props.allowDragX || this.props.allowDragY) {
            let axis: string | boolean = false;
            if (this.props.allowDragX && !this.props.allowDragY)
                axis = "x";
            else if (!this.props.allowDragX && this.props.allowDragY)
                axis = "y";

            $(this.native).draggable({
                axix: axis,
                drag: (event: any, ui: any) => {
                    if (this.props.bindObject) {
                        if (this.props.bindLeft)
                            this.props.bindObject[this.props.bindLeft] = ui.position.left;
                        if (this.props.bindTop)
                            this.props.bindObject[this.props.bindTop] = ui.position.top;
                    }
                    if (this.props.onDrag)
                        this.props.onDrag();
                    //console.log(event, ui);
                    //this.forceUpdate();
                    //appStateforceUpdate();
                }
            });
        }

        if (this.props.allowResize) {
            $(this.native).resizable({
                resize: (event: any, ui: any) => {
                    if (this.props.bindObject) {
                        if (this.props.bindHeight)
                            this.props.bindObject[this.props.bindHeight] = ui.size.height;
                        if (this.props.bindWidth)
                            this.props.bindObject[this.props.bindWidth] = ui.size.width;
                    }
                }
            });
        }
    }

    native: HTMLElement;

    render(): any {
        console.log("DraggableResizable render");
        let props: any = {};
        for (let propName of Object.keys(this.props)) {
            if (propName !== "children" && propName !== "ref" && !propName.startsWith("bind"))
                props[propName] = (this.props as any)[propName];
        }
        return (
            <div
                {...props}
                ref={(e) => {
                    this.native = e;
                }}
            >
                {this.props.children}
            </div>
        )

    }
}