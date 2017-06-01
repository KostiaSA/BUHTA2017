import * as React from "react";
import {HTMLProps, SyntheticEvent} from "react";
import {Component} from "../component/Component";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";


export interface IComponentWrapperProps extends HTMLProps<any> {
    component: Component;
    // bindObject?: any;
    // bindTop?: string;
    // bindLeft?: string;
    // bindHeight?: string;
    // bindWidth?: string;
    // allowDragX?: boolean;
    // allowDragY?: boolean;
    // allowResize?: boolean;
    // dragHandle?:string;
    // onDrag?:()=>void;
}


export class ComponentWrapper extends React.Component<IComponentWrapperProps, any> {

    allowDragX(): boolean {
        return this.props.component.designMode;
    }

    allowDragY(): boolean {
        return this.props.component.designMode;
    }

    allowResize(): boolean {
        return this.props.component.designMode;
    }

    componentDidMount() {
        if (this.allowDragX() || this.allowDragY()) {
            let axis: string | boolean = false;
            if (this.allowDragX() && !this.allowDragY())
                axis = "x";
            else if (!this.allowDragX() && this.allowDragY())
                axis = "y";

            $(this.native).draggable({
                handle: this.dragHandle,
                axix: axis,
                drag: (event: any, ui: any) => {
                    (this.props.component as any).left = ui.position.left;
                    (this.props.component as any).top = ui.position.top;
                }
            });
        }

        if (this.allowResize()) {
            $(this.native).resizable({
                resize: (event: any, ui: any) => {
                    (this.props.component as any).height = ui.size.height;
                    (this.props.component as any).width = ui.size.width;
                }
            });
        }
    }

    native: HTMLElement;
    dragHandle: HTMLElement;

    render(): any {
        //console.log("ComponentWrapper render");
        let props: any = {};
        for (let propName of Object.keys(this.props)) {
            if (propName !== "children" && propName !== "ref")
                props[propName] = (this.props as any)[propName];
        }

        if (!props.style)
            props.style = {};


        let dragHandleDisplay = "none";
        if (this.props.component.designMode && this.props.component.designer.isComponentSelected(this.props.component)) {
            props.style.border = "2px solid salmon";
            dragHandleDisplay = "block";
        }

        return (
            <div
                {...props}
                onMouseDown={(e: SyntheticEvent<any>) => {
                    if (this.props.component.designMode) {
                        this.props.component.designer.selectComponent(this.props.component);
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }}

                ref={(e) => {
                    this.native = e;
                }}
            >
                {this.props.children}
                <div
                    className="drag-handle"
                    ref={(e) => {
                        this.dragHandle = e;
                    }}
                    style={{
                        display: dragHandleDisplay,
                        cursor: "move",
                        top: 0,
                        left: 0,
                        height: 8,
                        width: 8,
                        position: "absolute",
                        backgroundColor: "salmon"
                    }}
                >
                </div>
            </div>
        )

    }
}

