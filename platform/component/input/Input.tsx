import * as React from "react";
import * as classNames from "classnames";
import {Component} from "../Component";
import {EnabledMixin} from "../mixin/EnabledMixin";
import {OnClickMixin} from "../mixin/OnClickMixin";
import {TopLeftMixin} from "../mixin/TopLeftMixin";
import {TextMixin} from "../mixin/TextMixin";
import {IconMixin} from "../mixin/IconMixin";
import {HeightWidthMixin} from "../mixin/HeightWidthMixin";
import {CSSProperties, KeyboardEvent, SyntheticEvent} from "react";
import {DraggableResizable} from "../../react/DraggableResizable";
import {AgGridReact} from "ag-grid-react";
import {isArray, isBoolean, isFunction, isNumber, isString} from "util";
import {AgGridColDef} from "../../react/AgGridColDef";
import GridApi = ag.grid.GridApi;
import ColumnApi = ag.grid.ColumnApi;
import {IComboBoxDataSource} from "./IComboBoxDataSource";
import {PropertyEditor, Категория_Прочее, Категория_События} from "../../designer/PropertyEditor";
let Highlighter = require("react-highlight-words");

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
        //console.log(this.props);
        return (
            <Highlighter
                highlightClassName="search-mark"
                searchWords={[this.props.data.filterStr]}
                textToHighlight={this.props.value}
            />);
    }
}


export class Input extends EnabledMixin(
    TopLeftMixin(
        HeightWidthMixin(
            Component
        ))) {

    style: IInputStyle = DefaultInputStyle;

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
        if (this.bindObject && this.bindProperty) {
            this.internalValue = this.bindObject[this.bindProperty];
            this.internalDefaultValue = this.bindObject[this.bindProperty + "_default"];
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
        if (this.bindObject && this.bindProperty) {
            this.internalValue = this.bindObject[this.bindProperty];
            this.internalDefaultValue = this.bindObject[this.bindProperty + "_default"];
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

    // ------------------------------ lookupDataSource ------------------------------
    _lookupDataSource: IComboBoxDataSource;
    get lookupDataSource(): IComboBoxDataSource {
        return this._lookupDataSource;
    }

    set lookupDataSource(value: IComboBoxDataSource) {
        this._lookupDataSource = value;
    }


    // // ------------------------------ comboItemsArray ------------------------------
    // _comboItemsArray: any[];
    // get comboItemsArray(): any[] {
    //     return this._comboItemsArray;
    // }
    //
    // set comboItemsArray(value: any[]) {
    //     this._comboItemsArray = value;
    //     if (this.comboType === "array" && isArray(value)) {
    //         let comboSource = [];
    //         for (let item of value) {
    //             if (isString(item)) {   // массив строк
    //                 comboSource.push(item);
    //             }
    //             else if (isArray(item)) {   // [35,"ООО Удача"] - value,label
    //                 let comboItem: IComboBoxItem = {
    //                     value: item[0],
    //                     label: item[1],
    //                 };
    //                 comboSource.push(comboItem);
    //             }
    //             else
    //                 comboSource.push(item);  // объект в формате IComboBoxItem
    //         }
    //         //this.jqxWidget({source: comboSource} as jqwidgets.ComboBoxOptions);
    //     }
    // }

    // private __emitCode_comboItemsArray(code: EmittedCode) {
    //     code.emitStringValue(this, "comboItemsArray", "none");
    // }

    // private __setOptions_comboItemsArray() {
    //     this.comboItemsArray = this._comboItemsArray;
    // }

    // private __getPropertyEditor_comboItemsArray(): PropertyEditor {
    //     let pe = new StringPropertyEditor();
    //     pe.propertyName = "comboItemsArray";
    //     pe.category = Категория_ПривязкаДанных;
    //     return pe;
    // }


    // ------------------------------ onChange ------------------------------
    protected _onChange: string | Function;
    get onChange(): string | Function {
        return this._onChange;
    }

    set onChange(value: string | Function) {
        this.setPropertyWithForceUpdate("_onChange", value);
    }

    protected get onChange_default(): string | Function {
        return undefined as any;
    }

    // emitCode_onChange(code: EmittedCode) {
    //     code.emitBooleanValue(this, "onChange", true);
    // }

    protected  __getPropertyEditor_onChange(): PropertyEditor {
        let StringPropertyEditor = require("../../designer/StringPropertyEditor").StringPropertyEditor;

        let pe = new StringPropertyEditor();
        pe.default = this.onChange_default;
        pe.propertyName = "onChange";
        pe.category = Категория_События;
        return pe;
    }


    // ------------------------------ getReactElement ------------------------------

    internalValue: string;
    internalDefaultValue: string;
    inputElement: HTMLElement;

    popupVisible: boolean = false;
    popupHeight: number = 300;
    popupWidth: number = 300;
    popupElement: HTMLElement;


    private inputValueChangeInterval: any;

    handleBlur = (event: any) => {
        let oldValue = this.bindObject[this.bindProperty];
        let needFireOnChange = false;
        if (this.internalValue !== oldValue) {
            this.bindObject[this.bindProperty] = this.internalValue;
            needFireOnChange = true;
        }
        if (needFireOnChange) {
            if (isFunction(this._onChange)) {
                (this._onChange as any)();
            }
            // todo сделать вызов, если onChange - строка
        }
    };

    handleInputValueChange = (event: any) => {
        this.internalValue = event.target.value;
        if (this.lookupDataSource) {
            if (this.inputValueChangeInterval)
                clearTimeout(this.inputValueChangeInterval);

            this.inputValueChangeInterval = setTimeout(() => {
                this.showCombobox(this.internalValue);

            }, this.lookupDataSource.getLookupDelayMs());
        }
        this.refresh();
    };

    handleInputKeyPress = (event: any) => {
        //     this.internalValue = event.target.value;
        //     //console.log(event.charCode);
        //     //this.refresh();
        //     this.showCombobox();
    };


    showCombobox(filterStr: string) {
        if (this.lookupDataSource) {
            this.popupVisible = true;
            this.refresh();
            this.lookupDataSource.getRows(filterStr, 200)
                .then((rows: any[]) => {
                    this.comboGridRowData = rows;
                    let cols: AgGridColDef[] = [];
                    let fromCol: AgGridColDef = {
                        colId: "col0",
                        headerName: "-",
                        field: this.lookupDataSource.getTitleFieldName(),
                        //maxWidth: 300,
                        //cellStyle: {whiteSpace: "normal"},
                        cellRendererFramework: AgGrid_CellRenderer,
                    };
                    cols.push(fromCol);
                    this.comboGridApi.setColumnDefs(cols);
                    this.comboGridApi.setRowData(rows);
                    this.comboGridApi.doLayout();
                    this.refresh();
                });
        }

    }

    hideCombobox() {
        this.popupVisible = false;
        this.inputElement.focus();
        this.refresh();
    }

    handleInputKeyDown = (event: KeyboardEvent<any>) => {
        //this.internalValue = event.code;
        if (event.key === "ArrowDown") {
            this.comboGridApi.setFocusedCell(0, "col0");
        }
        if (event.key === "Escape") {
            this.popupVisible = false;
            console.log(event.key);
        }
        this.refresh();
    };

    afterRender(isFirstRender: boolean) {
        super.afterRender(isFirstRender);
        //console.log("afterRender", isFirstRender);
        if (this.popupVisible) {
            ($(this.popupElement) as any).position({
                of: $(this.inputElement),
                my: "left top",
                at: "left bottom",
                collision: "none none",
            });
        }
    }


    comboGridApi: GridApi;
    comboGridColumnApi: ColumnApi;
    private comboGridRowData: any[] = [];


    gridReadyHandler = (event: { api: GridApi, columnApi: ColumnApi }) => {
        this.comboGridApi = event.api;
        this.comboGridColumnApi = event.columnApi;

        //this.comboGridApi.addEventListener()

        //this.comboGridApi.doLayout();
        //this.comboGridApi.sizeColumnsToFit();

        //console.log("gridReadyHandler==========================================================");
    };


    downButtonClick = () => {
        this.showCombobox("");
        setTimeout(() => {
            this.comboGridApi.setFocusedCell(0, "col0");
        }, 1);
    };


    getReactElement(index?: number | string): JSX.Element | null {
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
            paddingRight: 3,
            color:"black"
        };

        if (this.internalValue===this.internalDefaultValue) {
            inputStyle.color = "gray";
        }


        let downButtonStyle: CSSProperties = {
            height: 22,
            width: 20,
            paddingLeft: 0,
            paddingRight: 0,
            border: "1px solid silver",
            display: "inline-block",
            position: "relative",
            top: 1,
            left: -1
        };

        let gridHeight = this.comboGridRowData.length * 22 + 3;
        if (gridHeight > 300)
            gridHeight = 300;

        let popupStyle: CSSProperties = {
            backgroundColor: "white",
            position: "fixed",
            zIndex: 1000,
            display: this.popupVisible ? "block" : "none",
            height: gridHeight,//  this.popupHeight,
            width: this.popupWidth,
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
                    onBlur={this.handleBlur}
                    onKeyPress={this.handleInputKeyPress}
                    onKeyDown={this.handleInputKeyDown}
                />
                <span className="buhta-button" style={downButtonStyle} onClick={this.downButtonClick}>
                    <img src={"vendor/fugue/icons-shadowless/control-270.png"} height="16" width="16"
                         style={{marginLeft: 2, marginRight: 0, top: 3, position: "relative"}}/>

                </span>

                <DraggableResizable
                    className="ag-fresh"
                    bindObject={this}
                    bindHeight="popupHeight"
                    bindWidth="popupWidth"
                    allowResize
                    ref={(e: any) => {
                        if (e) {
                            this.popupElement = e.native;
                            //console.log("this.popupElement = e.native", e, e.native)
                        }
                    }}
                    style={popupStyle}
                >
                    <AgGridReact
                        suppressCellSelection={false}
                        className="ag-fresh"
                        rowHeight={22}
                        headerHeight={0}

                        suppressColumnVirtualisation={true}
                        enableSorting={true}
                        enableFilter={false}
                        onGridReady={this.gridReadyHandler}
                        rowStyle={{cursor: "pointer"}}
                        onGridSizeChanged={() => {
                            if (this.comboGridApi) this.comboGridApi.sizeColumnsToFit()
                        }}

                        onCellFocused={(e: any) => {
                            $(this.popupElement).find(".ag-cell").off("keydown.buhta");
                            $(this.popupElement).find(".ag-cell").on("keydown.buhta", (event) => {
                                //console.log(event.keyCode);

                                if (event.keyCode === 13) {

                                    let focusedRowIndex = this.comboGridApi.getFocusedCell().rowIndex;
                                    let renderedRows = this.comboGridApi.getRenderedNodes();

                                    for (let row of renderedRows) {
                                        if (row.rowIndex === focusedRowIndex) {
                                            this.internalValue = row.data[this.lookupDataSource.getTitleFieldName()];
                                            this.bindObject[this.bindProperty] == row.data[this.lookupDataSource.getValueFieldName()];
                                            this.hideCombobox();
                                            break;
                                        }
                                    }

                                }
                                if (event.keyCode === 27) {
                                    this.hideCombobox();
                                }
                            });
                        }}

                        onRowDataChanged={() => {
                            //this.refresh();
                            // if (this.comboGridApi) {
                            //
                            //     this.comboGridApi.doLayout();
                            //     this.comboGridApi.sizeColumnsToFit();
                            // }
                        }}
                        onRowClicked={(event: any) => {
                            console.log(event);
                            this.internalValue = event.data[this.lookupDataSource.getTitleFieldName()];
                            this.bindObject[this.bindProperty] == event.data[this.lookupDataSource.getValueFieldName()];
                            this.hideCombobox();
                            //appState.openIncomeMessagePage(event.data.документКлюч,this.props.navigatorBranch)
                        }}
                    />
                </DraggableResizable>
            </span>
        );

    }

}