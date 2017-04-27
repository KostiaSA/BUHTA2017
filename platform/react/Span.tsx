// import * as React from "react";
// import {HTMLProps} from "react";
// import {appStateforceUpdate} from "../util/appStateforceUpdate";
//
//
// export class Span extends React.Component<HTMLProps<any>, any> {
//
//
//     componentDidMount() {
//     }
//
//     native: HTMLElement;
//
//     render(): any {
//         console.log("Span render");
//         // ref={(e:any)=>{if (this.props.ref) (this.props.ref as any)(e)}}
//
//         let props:any={};
//         for (let propName of Object.keys(this.props)){
//             if (propName!=="children" && propName!=="ref")
//                 props[propName]=(this.props as any)[propName];
//         }
//
// //        style={this.props.style}
// //        className={this.props.className}>
//         return (
//             <span {...props}>
//                 {this.props.children}
//             </span>
//         )
//
//     }
// }