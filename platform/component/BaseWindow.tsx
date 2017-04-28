import * as React from "react";
import {Component} from "./Component";
import {DraggableResizable} from "../react/DraggableResizable";
import {Desktop} from "./Desktop";
import {getRandomId} from "../util/getRandomId";


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

    style: IWindowStyle = DefaultWindowStyle;

    //win1: BaseWindow = new BaseWindow();

    init() {
        if (this.initialized) return;
        super.init();

        //this.childrenAdd(this.win1);

    }

    top: number = 50;
    left: number = 50;
    height: number = 300;
    width: number = 400;

    icon: string = "vendor/fugue/icons-shadowless/application-blue.png";

    bringToFront() {
        (this.parent as Desktop).bringWindowToFront(this);
    }

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("getReactElement-window");
        this.init();
        return (
            <DraggableResizable
                key={this.id}
                bindObject={this}
                bindTop="top"
                bindLeft="left"
                onClick={() => {
                    console.log("win-click");
                    this.bringToFront();
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
                    outline: "1px solid " + this.style.borderColor,
                    boxShadow: "0 0 9px -1px #000",
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
                    <div style={{
                        flex: "1 1 auto",
                        overflow: "hidden",
                        padding: 5,
                        whiteSpace: "nowrap",
                        cursor: "move"
                    }}>
                        <img src={this.icon} height="16" width="16"/>
                        <span style={{
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
                    {this.children.map((child, index) => child.getReactElement(index))}
                </div>
            </DraggableResizable>
        );
    }

}