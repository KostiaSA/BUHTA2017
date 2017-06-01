
import {MixinConstructor} from "./MixinConstructor";
import {Component, IEvent, IEventArgs} from "../Component";
import {EmittedCode} from "../../designer/EmittedCode";

export function OnClickMixin<T extends MixinConstructor<Component>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        // ------------------------------ onClick ------------------------------
        _onClick: IEvent<IEventArgs>;
        get onClick(): IEvent<IEventArgs> {
            return this._onClick;
        }

        set onClick(value: IEvent<IEventArgs>) {
            this._onClick = value;
        }

        protected  __emitCode_onClick(code: EmittedCode) {
            code.emitEventValue(this, "onClick");
        }

    }
}
