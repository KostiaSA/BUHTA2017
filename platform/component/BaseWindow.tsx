import * as React from "react";
import {Component, Компоненты_Окна} from "./Component";
import {DraggableResizable} from "../react/DraggableResizable";
import {Desktop} from "./Desktop";
import {getRandomId} from "../util/getRandomId";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {SnapGrid} from "../react/SnapGrid";


export interface IWindowStyle {
    //headerHeight: number;
    borderColor: string;
    backgroundColor: string;
}

export const DefaultWindowStyle: IWindowStyle = {
    //headerHeight: 26,
    borderColor: "lightskyblue",
    backgroundColor: "white"

};

export class BaseWindow extends Component {

    constructor() {
        super();
    }

    getToolBoxLabel(): string {
        return "Window";
    }

    getDesignerLabel(): string {
        return "Window";
    }

    getDesignerImage(): string {
        return "vendor/fugue/icons/application-blue.png";
    }

    getDesignerCategory(): string {
        return Компоненты_Окна;
    }

    style: IWindowStyle = DefaultWindowStyle;

    top: number = 50;
    left: number = 50;
    width: number = 400;

    _height: number | string = 300;

    get height(): number | string {
        return this._height;
    }

    set height(value: number | string) {
        this._height = value;
        //this.setPropertyWithForceUpdate("_height", value);
    }


    icon: string = "vendor/fugue/icons-shadowless/application-blue.png";

    winId: string;

    bringToFront() {
        (this.parent as Desktop).bringWindowToFront(this);
    }


    getReactElement(index?: number | string): JSX.Element | null {
        console.log("getReactElement-window");

        let snapGrid: any = null;
        if (this.designMode)
            snapGrid = <SnapGrid/>;

        return (
            <DraggableResizable
                dragHandle=".drag-handle"
                allowResize
                allowDragX
                allowDragY
                key={this.id}
                bindObject={this}
                bindTop="top"
                bindLeft="left"
                bindHeight="height"
                bindWidth="width"
                onClick={() => {
                    console.log("win-click->" + this.constructor.name);
                    this.bringToFront();
                }}
                onDrag={() => {
                    this.refresh();
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: this.style.backgroundColor,
                    position: "absolute",
                    top: this.top,
                    left: this.left,
                    width: this.width,
                    height: this.height,
                    border: "2px solid " + this.style.borderColor,
                    borderRadius: 2,
                    //boxShadow: "0 0 9px -1px #000",
                    zIndex: 91
                }}>
                <div
                    className="window-title"
                    style={{
                        flex: "0 1 auto",
                        display: "flex",
                        flexDirection: "row",
                        height: 26,
                        //borderBottom: "1px solid " + this.style.borderColor,
                        backgroundColor: this.style.borderColor,
                    }}>
                    <div
                        className="drag-handle"
                        style={{
                            flex: "1 1 auto",
                            overflow: "hidden",
                            padding: 5,
                            whiteSpace: "nowrap",
                            cursor: "move"
                        }}>
                        <img src={this.icon} height="16" width="16"/>
                        <span
                            style={{
                                top: -4,
                                left: 5,
                                position: "relative",
                                whiteSpace: "nowrap",
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            это window top={this.top} {new Date().getTime()}
                        </span>
                    </div>
                    <div style={{flex: "0 1 auto", padding: "5px 5px 5px 0px"}}>
                        <img src={"platform/icons/window-minimize.png"} height="16" width="16"
                             style={{opacity: 0.8, cursor: "pointer"}}/>
                    </div>
                    <div style={{flex: "0 1 auto", padding: "5px 5px 5px 0px"}}>
                        <img src={"platform/icons/window-normalize.png"} height="16" width="16"
                             style={{opacity: 0.8, cursor: "pointer"}}/>
                    </div>
                    <div style={{flex: "0 1 auto", padding: "5px 5px 5px 0px"}}>
                        <img src={"platform/icons/window-maximize.png"} height="16" width="16"
                             style={{opacity: 0.8, cursor: "pointer"}}/>
                    </div>
                    <div style={{flex: "0 1 auto", padding: "5px 5px 5px 0px"}}>
                        <img src={"platform/icons/window-close.png"} height="16" width="16"
                             style={{opacity: 0.8, cursor: "pointer"}}/>
                    </div>

                </div>
                <div
                    className="window-content"
                    style={{
                        flex: "1 0 auto",
                        overflow: "auto",
                        position: "relative"
                        //outline: "2px solid orange",
                    }}>
                    {snapGrid}
                    {this.children.map((child, index) => <ComponentAsReactElement component={child}
                                                                                  key={index}> </ComponentAsReactElement>)}
                </div>
            </DraggableResizable>
        );
    }

}