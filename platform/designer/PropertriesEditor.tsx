import * as React from "react";
import * as classNames from "classnames";
import * as R from "ramda";
//import {appStateforceUpdate} from "../util/appStateforceUpdate";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";
import {SnapGrid} from "../react/SnapGrid";
import {DraggableResizable} from "../react/DraggableResizable";
import {SyntheticEvent} from "react";
import {ComponentWrapper} from "../react/ComponentWrapper";
import {EnabledMixin} from "../component/mixin/EnabledMixin";
import {TopLeftMixin} from "../component/mixin/TopLeftMixin";
import {HeightWidthMixin} from "../component/mixin/HeightWidthMixin";
import {Component} from "../component/Component";
import {PropertyEditor, PropertyEditorCategories} from "./PropertyEditor";
import {getAllObjectProps} from "../util/getAllObjectProps";
import {BooleanPropertyEditor} from "./BooleanPropertyEditor";

export class PropertiesEditor extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {


    // ------------------------------ getReactElement ------------------------------

    // ------------------------------ editedObject ------------------------------
    _editedObject: Component;
    get editedObject(): Component {
        return this._editedObject;
    }

    set editedObject(value: Component) {
        this.setPropertyWithForceUpdate("_editedObject", value);
    }


    renderEditors(): JSX.Element[] {
        if (!this.editedObject)
            return [];

        let trs: JSX.Element[] = [];

        let allCategories: string[] = R.clone(PropertyEditorCategories);
        let categories: string[] = [];

        let propEditors: PropertyEditor[] = [];

        for (let propName of getAllObjectProps(this.editedObject)) {
            if (propName.startsWith("__getPropertyEditor_")) {
                let pe = ((this.editedObject as any)[propName]).call(this);
                pe.component = this.editedObject;
                if (pe.visible()) {
                    allCategories.push(pe.category);
                    categories.push(pe.category);
                    propEditors.push(pe);
                }
            }
        }

        allCategories = R.uniq(allCategories);

        for (let category of allCategories) {

            if (R.contains(category, categories)) {
                let categoryTr = (
                    <tr>
                        <td
                            colSpan={2}
                            style={{
                                textAlign: "right",
                                fontWeight: "bold",
                                fontSize: 11,
                                paddingTop: 7,
                                paddingBottom: 5,
                                paddingLeft: 5,
                                paddingRight: 5
                            }}
                        >{category}</td>
                        <td></td>
                    </tr>);
                trs.push(categoryTr);

                for (let pe of propEditors) {
                    if (pe.category === category) {

                        let title = pe.title || pe.propertyName;
                        if (pe instanceof BooleanPropertyEditor)
                            title = "";

                        let tr = (
                            <tr key={pe.propertyName}>
                                <td style={{minWidth: 50, paddingLeft: 5, paddingRight: 5}}>{title}</td>
                                <td>{pe.render()}</td>
                            </tr>
                        );
                        trs.push(tr);
                    }
                }
            }
        }

        return trs;

    }

    getReactElement(index?: number | string): JSX.Element | null {

        return (
            <div style={{border: "0px solid red"}}>
                <table style={{border: "0px solid green", width: "95%", borderSpacing: "0"}}>
                    {this.renderEditors()}
                </table>
            </div>
        )

    }

}