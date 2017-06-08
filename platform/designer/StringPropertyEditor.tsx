import * as React from "react";
import {PropertyEditor} from "./PropertyEditor";
import {Input} from "../component/input/Input";
import {ComponentAsReactElement} from "../react/ComponentAsReactElement";



export class StringPropertyEditor extends PropertyEditor {

    render(): JSX.Element {

        let input = new Input();
        input.left = 0;
        input.top = 0;
        input.right = 0;
//        input.bottom=0;
        input.bindObject = this.component;
        input.bindProperty = this.propertyName;
        input.onChange = () => {
            this.component.designer.componentChanged(this.component);
        };

        return (
            <ComponentAsReactElement component={input} key={0}></ComponentAsReactElement>
        )
    }
}