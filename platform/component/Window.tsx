import * as React from "react";
import {Component} from "./Component";
import {DraggableResizable} from "../react/DraggableResizable";
//import Draggable from "react-draggable";
//let Draggable = require('react-draggable');
//let Resizable = require('react-resizable').Resizable;


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

export class Window extends Component {

    style: IWindowStyle = DefaultWindowStyle;

    //win1: Window = new Window();

    init() {
        if (this.initialized) return;
        super.init();

        //this.childrenAdd(this.win1);

    }

    top: number = 50;
    left: number = 50;
    height: number = 300;
    width: number = 300;

    icon: string = "vendor/fugue/icons-shadowless/application-blue.png";

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("getReactElement-window");
        this.init();
        return (
            <DraggableResizable
                key={index}
                bindObject={this}
                bindTop="top"
                bindLeft="left"
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
                    boxShadow: "0 0 9px -1px #000"
                }}>
                <div
                    className="window-title"
                    style={{
                        flex: "0 1 auto",
                        display: "flex",
                        flexDirection: "row",
                        height: 26,
                        //borderBottom: "1px solid " + this.style.borderColor,
                        backgroundColor:this.style.borderColor
                    }}>
                    <div style={{flex: "1 1 auto", overflow: "hidden", padding: 5, whiteSpace: "nowrap", cursor:"move"}}>
                        <img src={this.icon} height="16" width="16"/>
                        <span style={{
                            top: -4,
                            left: 5,
                            position: "relative",
                            whiteSpace: "nowrap",
                            color:"white",
                            fontWeight:"bold"
                        }}
                        >
                            это window top={this.top} {new Date().getTime()}
                        </span>
                    </div>
                    <div style={{flex: "0 1 auto", padding: 5}}>
                        <img src={"vendor/fugue/icons-shadowless/cross.png"} height="16" width="16" style={{opacity: 0.6, cursor:"pointer"}}/>
                    </div>

                </div>
                <div
                    className="window-content"
                    style={{
                        flex: "1 0 auto",
                        //outline: "2px solid orange",
                    }}>
                    это window content={this.top} {new Date().getTime()}
                </div>
            </DraggableResizable>
        );
    }

}