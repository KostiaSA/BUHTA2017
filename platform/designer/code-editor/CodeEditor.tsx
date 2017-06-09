//import * as fs from "fs";
import * as React from "react";

import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import IEditorOptions = monaco.editor.IEditorOptions;
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;
import {Component} from "../../component/Component";
import {TopLeftMixin} from "../../component/mixin/TopLeftMixin";
import {HeightWidthMixin} from "../../component/mixin/HeightWidthMixin";
import {MonacoEditor} from "../../react/MonacoEditor";


export class CodeEditor extends TopLeftMixin(
    HeightWidthMixin(
        Component
    )) {

    constructor() {
        super();
    }

    // ------------------------------ code ------------------------------
    _code: string;
    get code(): string {
        if (this.monacoEditor)
            return this.monacoEditor.getValue();
        else
            return this._code;
    }

    set code(value: string) {
        this._code = value;
        if (this.monacoEditor)
            this.monacoEditor.setValue(value);
    }

    createAppToolBar() {
        // let saveCodeEditor: ToolCodeEditor = new ToolCodeEditor();
        // saveCodeEditor.group="form-designer";
        // saveCodeEditor.text=getRandomId();
        // appState.toolbar.childrenAdd(saveCodeEditor);

    }

    getReactElement(index?: number | string): JSX.Element | null {

        return (
            <MonacoEditor
                style={{...this.getTopLeftMixinStyle(),...this.getHeightWidthMixinStyle()}}
                value={this.code}
                options={this.getMonacoEditorOptions()}
                requireConfig={{}}
                theme={""}

            />
        )

        // return (
        //     <div
        //         style={{...this.getTopLeftMixinStyle(),...this.getHeightWidthMixinStyle()}}
        //         ref={(e) => {
        //
        //         console.log("MONACO------------------------------------------",e);
        //
        //         if (this.monacoEditor || !e)
        //             return;
        //
        //         // workaround monaco-css not understanding the environment
        //         (window as any).module = undefined;
        //         // workaround monaco-typescript not understanding the environment
        //         (window as any).process.browser = true;
        //
        //         let __this = this;
        //
        //         (window as any).amdRequire(["vs/editor/editor.main"], function () {
        //       //      debugger
        //             __this.monacoEditor = (window as any).monaco.editor.create(e, __this.getMonacoEditorOptions());
        //
        //         });
        //
        //
        //     }
        //     }>code editor</div>
        // );
    }

    // ------------------------------ render ------------------------------
    // render(designer?: IDesigner) {
    //     this._designer = designer;
    //     if (!this.initialized)
    //         this.init();
    //     (this as any)._$id = this.parent.$childrenContainer.attr("id");
    //     this.$.css("overflow", "hidden");
    //
    //     // инициализируется monaco editor
    //     if (this.monacoEditor)
    //         return;
    //
    //     // workaround monaco-css not understanding the environment
    //     (self as any).module = undefined;
    //     // workaround monaco-typescript not understanding the environment
    //     (self as any).process.browser = true;
    //
    //     let __this = this;
    //
    //     (window as any).amdRequire(["vs/editor/editor.main"], function () {
    //
    //         __this.monacoEditor = (window as any).monaco.editor.create(__this.$[0], __this.getMonacoEditorOptions());
    //
    //     });
    //
    //
    // }


    getMonacoEditorOptions(): IEditorConstructionOptions {
        return {
            //value: fs.readFileSync("application/test/ТестоваяФормаДляДизайнера.ts", "utf8"),
            value: this._code,
            fontSize: 13,
            automaticLayout: true,
            folding: true,
            language: 'typescript'

        }
    }

    monacoEditor: IStandaloneCodeEditor;


}