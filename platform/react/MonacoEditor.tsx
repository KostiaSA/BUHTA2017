import * as React from "react";
import {HTMLProps} from "react";
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;


export interface IMonacoEditorProps extends HTMLProps<any> {
    value: string;
    options: IEditorConstructionOptions;
    theme: string;
    requireConfig: any;
    onCodeChange?: (newCode: string) => void;
    editorDidMount?: (monaco: any) => void;
    editorWillMount?: (monaco: any) => void;
}


export class MonacoEditor extends React.Component<IMonacoEditorProps, any> {

    __current_value: string;
    editor: any;

    constructor(props: IMonacoEditorProps) {
        super(props);
        this.__current_value = props.value;
    }

    componentDidMount() {
        this.afterViewInit();
    }

    componentWillUnmount() {
        this.destroyMonaco();
    }

    componentDidUpdate(prevProps: IMonacoEditorProps) {

        const context = window;
        if (this.props.value !== this.__current_value) {
            // Always refer to the latest value
            this.__current_value = this.props.value;
            // Consider the situation of rendering 1+ times before the editor mounted
            if (this.editor) {
                (this as any).__prevent_trigger_change_event = true;
                this.editor.setValue(this.__current_value);
                (this as any).__prevent_trigger_change_event = false;
            }
        }
        // if (prevProps.language !== this.props.language) {
        //     context.monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
        //}
    }

    editorWillMount(monaco: any) {
        if (this.props.editorWillMount)
            this.props.editorWillMount(monaco);
    }

    editorDidMount(editor: any, monaco: any) {
        //const { editorDidMount, onChange } = this.props;
        //editorDidMount(editor, monaco);

        if (this.props.editorDidMount)
            this.props.editorDidMount(monaco);


        editor.onDidChangeModelContent((event: any) => {
            const value = editor.getValue();

            // Always refer to the latest value
            this.__current_value = value;

            // Only invoking when user input changed
            if (!(this as any).__prevent_trigger_change_event) {
                if (this.props.onCodeChange)
                    this.props.onCodeChange(value);
            }
        });
    }

    afterViewInit() {


        let requireConfig = this.props.requireConfig;
        const loaderUrl = requireConfig.url || "vs/loader.js";
        const context = window as any;
        const onGotAmdLoader = () => {
            if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
                // Do not use webpack
                if (requireConfig.paths && requireConfig.paths.vs) {
                    context.require.config(requireConfig);
                }
            }

            // // Load monaco
            // context.require(["vs/editor/editor.main"], () => {
            //     this.initMonaco();
            // });


            if (this.containerElement) {
                // workaround monaco-css not understanding the environment
                (window as any).module = undefined;
                // workaround monaco-typescript not understanding the environment
                (window as any).process.browser = true;

                let __this = this;

                (window as any).amdRequire(["vs/editor/editor.main"], function () {
                    __this.initMonaco();
                    //__this.monacoEditor = (window as any).monaco.editor.create(e, __this.getMonacoEditorOptions());

                });

            }

            // Call the delayed callbacks when AMD loader has been loaded
            if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
                context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
                let loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
                if (loaderCallbacks && loaderCallbacks.length) {
                    let currentCallback = loaderCallbacks.shift();
                    while (currentCallback) {
                        currentCallback.fn.call(currentCallback.context);
                        currentCallback = loaderCallbacks.shift();
                    }
                }
            }
        };

        // Load AMD loader if necessary

        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
            // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
            //  delay to call callbacks except the first one
            context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
            context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
                context: this,
                fn: onGotAmdLoader
            });
        } else {
            if (typeof context.require === "undefined") {
                var loaderScript = context.document.createElement("script");
                loaderScript.type = "text/javascript";
                loaderScript.src = loaderUrl;
                loaderScript.addEventListener("load", onGotAmdLoader);
                context.document.body.appendChild(loaderScript);
                context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
            } else {
                onGotAmdLoader();
            }
        }
    }

    containerElement: any;

    initMonaco() {
        if (this.editor)
            return;
        const value = this.props.value !== null ? this.props.value : this.props.defaultValue;
        const {theme, options} = this.props;
        const context = window as any;
        if (typeof context.monaco !== "undefined") {
            // Before initializing monaco editor
            this.editorWillMount(context.monaco);

            this.editor = context.monaco.editor.create(this.containerElement, {
                value,
                language: options.language,
                theme,
                ...options,
            });

            // After initializing monaco editor
            this.editorDidMount(this.editor, context.monaco);

        }
    }

    destroyMonaco() {
        if (typeof this.editor !== "undefined") {
            this.editor.dispose();
        }
    }

    render() {
        //console.log("RENDER MONACO-EDITOR");
        return (
            <div ref={(e) => {
                if (e) {
                    this.containerElement = e;
                }
            }} style={this.props.style}></div>
        )
    }

// render(): any {
//     console.log("MonacoEditor");
//
//     let props: any = {};
//     for (let propName of Object.keys(this.props)) {
//         if (propName !== "children" && propName !== "ref")
//             props[propName] = (this.props as any)[propName];
//     }
//
//     return (
//         <div {...props}>
//             {this.props.children}
//         </div>
//     )
//
// }
}