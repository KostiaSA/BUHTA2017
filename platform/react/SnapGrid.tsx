import * as React from "react";
import {HTMLProps} from "react";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";


export class SnapGrid extends React.Component<HTMLProps<any>, any> {

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        //console.log("DRAW-SNAP-GRID",this.ref);
        const ctx = this.ref.getContext("2d");
        ctx.fillStyle="gray";
        for (let x = 4; x < this.ref.width; x += 8)
            for (let y = 4; y < this.ref.height; y += 8)
                ctx.fillRect(x, y, 1, 1);
    }

    ref: any;

    render(): any {
        //console.log("SnapGrid render");

        let props: any = {};
        for (let propName of Object.keys(this.props)) {
            if (propName !== "children" && propName !== "ref")
                props[propName] = (this.props as any)[propName];
        }

        return (
            <div style={{position: "absolute", left: 0, top: 0, right:0, bottom:0, overflow: "hidden"}}>
                <canvas ref={(e) => this.ref = e} height="1100px" width="2000px"
                        style={{position: "absolute", left: 0, top: 0, backgroundColor: "transparent"}}></canvas>
            </div>
        )

    }
}