import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {TabPanelItem} from "./TabPanelItem";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {SnapGrid} from "../react/SnapGrid";


// export interface IButtonStyle {
//     //headerHeight: number;
//     borderColor: string;
//     backgroundColor: string;
// }
//
// export const DefaultButtonStyle: IButtonStyle = {
//     //headerHeight: 26,
//     borderColor: "lightskyblue",
//     backgroundColor: "white"
//
// };

export class TabPanel extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {

    //style: IButtonStyle = DefaultButtonStyle;

    // protected get height_default(): number | string {
    //     return "100%";
    // }


    // ------------------------------ activeTab ------------------------------
    _activeTab: TabPanelItem;

    get activeTab(): TabPanelItem {
        if (!this._activeTab && this.children.length > 0)
            this._activeTab = this.children[0] as TabPanelItem;
        return this._activeTab;
    }

    set activeTab(value: TabPanelItem) {
        this.setPropertyWithForceUpdate("_activeTab", value);
    }


    // ------------------------------ getReactElement ------------------------------

    getReactElement(index?: number | string): JSX.Element | null {
        console.log("TabPanel-getReactElement()", this.enabled);

        let panelClass = classNames({
            "buhta-tab-panel": true,
        });

        let tabsTitles: JSX.Element[] = [];
        let tabsContent: JSX.Element[] = [];

        for (let child of this.children) {
            let panelItem = child as TabPanelItem;

            let iconTag: JSX.Element | null = null;
            if (panelItem.icon)
                iconTag = (
                    <td style={{verticalAlign: "middle"}}>
                        <img src={panelItem.icon} height="16" width="16"
                             style={{marginLeft: 6, marginRight: 0, top: 1, position: "relative"}}/>
                    </td>
                );

            let textTag = (
                <td style={{verticalAlign: "middle"}}>
                <span style={{
                    position: "relative",
                    whiteSpace: "nowrap",
                    marginLeft: 6,
                    marginRight: 6,
                    top: -1,
                    cursor: this.enabled ? "pointer" : "default",
                }}
                >
                    {panelItem.text}
                </span>
                </td>
            );

            let trTag = (
                <tr>
                    {iconTag}
                    {textTag}
                </tr>
            );

            tabsTitles.push(
                <span
                    onClick={() => {
                        if (this.activeTab !== panelItem) {
                            this.activeTab = panelItem;
                            this.refresh();
                        }
                    }}

                    style={{
                        borderRight: "1px solid rgb(214, 214, 214)",
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        display: "inline-block",
                        height: 28,
                        paddingTop: "10 0 0 5",
                        position: "relative",
                        cursor: panelItem.enabled ? "pointer" : "default",
                        top: 1,
                        backgroundColor: panelItem === this.activeTab ? "white" : undefined
                    }}>
                    <table style={{height: 28}}>
                        <tbody>
                           {trTag}
                        </tbody>
                    </table>
                </span>
            );

            let snapGrid: any = null;
            if (this.designMode)
                snapGrid = <SnapGrid/>;


            tabsContent.push(
                <div style={{
                    display: panelItem === this.activeTab ? "block" : "none",
                    //height: "100%",
                    overflow: "auto",
                    position:"absolute",
                    top:0,
                    left:0,
                    right:0,
                    bottom:0,
                    border:"0px solid red"
                }}>
                    {/*{ panelItem.children.map((child, index) => child.getReactElement(index))}*/}
                    {snapGrid}
                    {panelItem.children.map((child, index) => <ComponentAsReactElement component={child} key={index}> </ComponentAsReactElement> )}
                </div>
            )


        }

        let tabs = <div
            style={{flex: "0 1 auto", paddingLeft: 2, backgroundColor: "rgb(234, 234, 234)"}}>{tabsTitles}</div>;

        let content = <div style={{flex: "1 1 auto",position:"relative"}}>{tabsContent}</div>;

        return (
            <div
                className={panelClass}
                style={{
                    ...this.getTopLeftMixinStyle(),
                    ...this.getHeightWidthMixinStyle(),
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    border: "1px solid rgb(214, 214, 214)"
                }}>
                {tabs}
                {content}
            </div>
        );

    }

}