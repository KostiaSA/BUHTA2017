import * as React from "react";
import * as classNames from "classnames";
import {Component} from "./Component";
import {EnabledMixin} from "./mixin/EnabledMixin";
import {OnClickMixin} from "./mixin/OnClickMixin";
import {TopLeftMixin} from "./mixin/TopLeftMixin";
import {TextMixin} from "./mixin/TextMixin";
import {IconMixin} from "./mixin/IconMixin";
import {HeightWidthMixin} from "./mixin/HeightWidthMixin";
import {CSSProperties, KeyboardEvent, SyntheticEvent} from "react";
import {DraggableResizable} from "../react/DraggableResizable";
import {AgGridReact} from "ag-grid-react";
import {isArray, isBoolean, isNumber, isString} from "util";
import {AgGridColDef} from "../react/AgGridColDef";
import GridApi = ag.grid.GridApi;
import ColumnApi = ag.grid.ColumnApi;


export interface IInputStyle {
    //headerHeight: number;
    borderColor: string;
    backgroundColor: string;
}

export const DefaultInputStyle: IInputStyle = {
    //headerHeight: 26,
    borderColor: "lightskyblue",
    backgroundColor: "white"

};

export type InputValueType = "auto" | "string" | "number" | "boolean";
export type InputComboType = "none" | "array" | "sql" | "function" | "system";

export interface IComboBoxItem {
    label?: string;
    value?: any;
    checked?: boolean;
    disabled?: boolean;
    group?: string;
    hasThreeStates?: boolean;
    html?: string;
    image?: string;
}

class AgGrid_CellRenderer extends React.Component<any, any> {

    render() {
        let style: CSSProperties = {};
        return <span style={style}>{this.props.value}</span>;
    }
}


export class Input extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {

    style: IInputStyle = DefaultInputStyle;


    init() {
        if (this.initialized) return;
        super.init();
    }

    protected get height_default(): number | string {
        return 20;
    }


    // ------------------------------ bindObject ------------------------------
    _bindObject: any;
    get bindObject(): any {
        return this._bindObject;
    }

    set bindObject(value: any) {
        this._bindObject = value;
        if (this.bindProperty && this.bindProperty) {
            this.internalValue = this.bindObject[this.bindProperty];
        }
        // if (this.$) {
        //     if (this._designer) {
        //         this.$.text("[" + this._bindProperty + "]:" + this.valueType);
        //     }
        //     else {
        //         if (this.bindObject && this.$.val() !== this.bindObject[this.bindProperty])
        //             this.$.val(this.bindObject[this.bindProperty]);
        //     }
        // }

    }

    // private __emitCode_bindObject(code: EmittedCode) {
    //     //code.emitobjectValue(this, "bindObject");
    // }


    // ------------------------------ bindProperty ------------------------------
    _bindProperty: string;
    get bindProperty(): string {
        return this._bindProperty;
    }

    set bindProperty(value: string) {
        this._bindProperty = value;
        if (this.bindProperty && this.bindProperty) {
            this.internalValue = this.bindObject[this.bindProperty];
        }
        // if (this.$) {
        //     if (this._designer) {
        //         this.$.text("[" + this._bindProperty + "]:" + this.valueType);
        //     }
        //     else {
        //         if (this.bindObject && this.$.val() !== this.bindObject[this.bindProperty])
        //             this.$.val(this.bindObject[this.bindProperty]);
        //     }
        // }
    }

    // private __emitCode_bindProperty(code: EmittedCode) {
    //     code.emitStringValue(this, "bindProperty");
    // }
    //
    // private __getPropertyEditor_bindProperty(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "bindProperty";
    //     pe.category = Категория_ПривязкаДанных;
    //     return pe;
    // }


    get actualValueType(): InputValueType {
        if (this.valueType === "auto") {
            if (this.bindObject && this.bindObject[this.bindProperty] !== undefined) {
                let value = this.bindObject[this.bindProperty];
                if (isString(value))
                    return "string";
                else if (isNumber(value))
                    return "number";
                else if (isBoolean(value))
                    return "boolean";
                else
                    throw "Input.actualValueType(): неизвестный тип переменной '" + this.bindProperty + "'";
            }
            else
                return "string";
        }
        else
            return this.valueType;
    }

    // ------------------------------ valueType ------------------------------
    _valueType: InputValueType = "auto";
    get valueType(): InputValueType {
        return this._valueType;
    }

    set valueType(value: InputValueType) {
        let needReloadPropertyEditor = this._valueType !== value;
        this._valueType = value;
        // if (this.$ && needReloadPropertyEditor && this._designer) {
        //     this._designer.reloadPropertyEditor();
        // }
    }

    // private __emitCode_valueType(code: EmittedCode) {
    //     code.emitStringValue(this, "valueType", "auto");
    // }
    //
    // private __getPropertyEditor_valueType(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "valueType";
    //     pe.comboType = "array";
    //     pe.comboItemsArray = ["auto", "string", "number", "boolean"];
    //     pe.category = Категория_ПривязкаДанных;
    //     return pe;
    // }

    // ------------------------------ comboType ------------------------------
    _comboType: InputComboType = "none";
    get comboType(): InputComboType {
        return this._comboType;
    }

    set comboType(value: InputComboType) {
        let needReloadPropertyEditor = this._comboType !== value;
        this._comboType = value;

        // if (this.$ && needReloadPropertyEditor) {
        //     if (this.comboType === "array")
        //         this.comboItemsArray = this._comboItemsArray;
        // }
        //
        // if (this.$ && needReloadPropertyEditor && this._designer) {
        //     this._designer.reloadPropertyEditor();
        // }
    }

    // private __emitCode_comboType(code: EmittedCode) {
    //     code.emitStringValue(this, "comboType", "none");
    // }
    //
    // private __getPropertyEditor_comboType(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.comboType = "array";
    //     pe.comboItemsArray = ["none", "array", "sql", "function", "system"];
    //     pe.propertyName = "comboType";
    //     pe.category = Категория_ComboBox;
    //     return pe;
    // }

    // ------------------------------ comboItemsArray ------------------------------
    _comboItemsArray: any[];
    get comboItemsArray(): any[] {
        return this._comboItemsArray;
    }

    set comboItemsArray(value: any[]) {
        this._comboItemsArray = value;
        if (this.comboType === "array" && isArray(value)) {
            let comboSource = [];
            for (let item of value) {
                if (isString(item)) {   // массив строк
                    comboSource.push(item);
                }
                else if (isArray(item)) {   // [35,"ООО Удача"] - value,label
                    let comboItem: IComboBoxItem = {
                        value: item[0],
                        label: item[1],
                    };
                    comboSource.push(comboItem);
                }
                else
                    comboSource.push(item);  // объект в формате IComboBoxItem
            }
            //this.jqxWidget({source: comboSource} as jqwidgets.ComboBoxOptions);
        }
    }

    // private __emitCode_comboItemsArray(code: EmittedCode) {
    //     code.emitStringValue(this, "comboItemsArray", "none");
    // }

    private __setOptions_comboItemsArray() {
        this.comboItemsArray = this._comboItemsArray;
    }

    // private __getPropertyEditor_comboItemsArray(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "comboItemsArray";
    //     pe.category = Категория_ПривязкаДанных;
    //     return pe;
    // }


    // ------------------------------ getReactElement ------------------------------

    internalValue: string;
    inputElement: HTMLElement;

    popupVisible: boolean;
    popupHeight: number = 300;
    popupWidth: number = 300;
    popupElement: HTMLElement;

    handleInputValueChange = (event: any) => {
        this.internalValue = event.target.value;
        this.refresh();
    };

    handleInputKeyPress = (event: KeyboardEvent<any>) => {
        //this.internalValue = event.code;
        //console.log(event.charCode);
        //this.refresh();
    };

    handleInputKeyDown = (event: KeyboardEvent<any>) => {
        //this.internalValue = event.code;
        if (event.key === "ArrowDown") {
            this.popupVisible = true;
            console.log(event.key);
        }
        if (event.key === "Escape") {
            this.popupVisible = false;
            console.log(event.key);
        }
        this.refresh();
    };

    afterRender(isFirstRender: boolean) {
        super.afterRender(isFirstRender);
        console.log("afterRender", isFirstRender);
        if (this.popupVisible) {
            ($(this.popupElement) as any).position({
                of: $(this.inputElement),
                my: "left top",
                at: "left bottom",
                collision: "none none"
            });
        }
    }


    getColumnDefs(): ag.grid.ColDef[] {
        let cols: AgGridColDef[] = [];

        let fromCol: AgGridColDef = {
            headerName: "от кого",
            field: "отправитель",
            maxWidth: 300,
            cellStyle: {whiteSpace: "normal"},
            cellRendererFramework: AgGrid_CellRenderer,
        };
        cols.push(fromCol);

        return cols;
    }

    comboGridApi: GridApi;
    comboGridColumnApi: ColumnApi;
    comboGridRowData: any[] = [];


    gridReadyHandler = (event: { api: GridApi, columnApi: ColumnApi }) => {
        this.comboGridApi = event.api;
        this.comboGridColumnApi = event.columnApi;
        //console.log("gridReadyHandler", event);
        //event.comboGridApi.sizeColumnsToFit();
    };


    getReactElement(index?: number | string): JSX.Element | null {
        this.init();
        console.log("Input-getReactElement()", this.enabled);

        let inputClass = classNames({
            "buhta-input": true,
            "disabled": !this.enabled,
        });

        let mainSpanStyle: CSSProperties = {
            ...this.getTopLeftMixinStyle(),
            overflow: "hidden",
            padding: 0,
            whiteSpace: "nowrap",
            width: this.width,
            cursor: this.enabled ? "pointer" : "default",
        };

        let inputStyle: CSSProperties = {
            height: this.height,
            width: this.width,
            paddingLeft: 5,
            paddingRight: 3
        };

        let popupStyle: CSSProperties = {
            backgroundColor: "white",
            position: "fixed",
            zIndex: 1000,
            display: this.popupVisible ? "block" : "none",
            border: "1px solid silver",
            top: 0,
            left: 0,
            height: this.popupHeight,
            width: this.popupWidth

        };

        return (
            <span
                style={mainSpanStyle}
            >
                <input
                    style={inputStyle}
                    ref={(e) => {
                        this.inputElement = e
                    }}
                    type="text"
                    value={this.internalValue}
                    onChange={this.handleInputValueChange}
                    onKeyPress={this.handleInputKeyPress}
                    onKeyDown={this.handleInputKeyDown}
                />
                <DraggableResizable
                    bindObject={this}
                    bindHeight="popupHeight"
                    bindWidth="popupWidth"
                    allowResize
                    ref={(e: any) => {
                        if (e) {
                            this.popupElement = e.native;
                            console.log("this.popupElement = e.native", e, e.native)
                        }
                    }}
                    style={popupStyle}
                >
                    <AgGridReact
                        rowHeight={58}
                        columnDefs={this.getColumnDefs()}
                        suppressColumnVirtualisation={true}
                        enableSorting={true}
                        enableFilter={false}
                        rowData={this.comboGridRowData}
                        onGridReady={this.gridReadyHandler}
                        rowStyle={{cursor: "pointer"}}
                        onGridSizeChanged={() => {
                            if (this.comboGridApi) this.comboGridApi.sizeColumnsToFit()
                        }}
                        onRowDataChanged={() => {
                            if (this.comboGridApi) this.comboGridApi.sizeColumnsToFit()
                        }}
                        onRowClicked={(event: any) => {
                            //appState.openIncomeMessagePage(event.data.документКлюч,this.props.navigatorBranch)
                        }}
                    />
                </DraggableResizable>
            </span>
        );

    }

}