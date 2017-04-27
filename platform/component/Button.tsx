import * as React from "react";
import {Component} from "./Component";
import {DraggableResizable} from "../react/DraggableResizable";


export interface IButtonStyle {
    //headerHeight: number;
    borderColor: string;
    backgroundColor: string;
}

export const DefaultButtonStyle: IButtonStyle = {
    //headerHeight: 26,
    borderColor: "lightskyblue",
    backgroundColor: "white"

};

export class Button extends Component {

    style: IButtonStyle = DefaultButtonStyle;


    init() {
        if (this.initialized) return;
        super.init();
    }

    top: number = 50;
    left: number = 50;
    height: number = 300;
    width: number = 400;
    text: string | JSX.Element;

    icon: string = "vendor/fugue/icons-shadowless/application-blue.png";

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("getReactElement-window");
        this.init();
        return (
            <span
                className="buhta-button"
                style={{
                    position: "relative",
                    top: this.top,
                    left: this.left,
                    overflow: "hidden",
                    padding: 8,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                }}>
                <img src={this.icon} height="16" width="16" style={{ position: "relative", top: 2}}   />
                <span style={{
                    position: "relative",
                    whiteSpace: "nowrap",
                    marginLeft: 6,
                    top: -1,
                    marginRight:1
                }}
                >
                    {this.text}
                </span>
            </span>
        );
    }

}