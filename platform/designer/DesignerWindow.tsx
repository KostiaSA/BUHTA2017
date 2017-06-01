import * as React from "react";
import * as path from "path";
import * as fs from "fs";
import {BaseWindow} from "../component/BaseWindow";
import {TabPanel} from "../component/TabPanel";
import {TabPanelItem} from "../component/TabPanelItem";
import {SplitPanel} from "../component/SplitPanel";
import {SplitPanelItem} from "../component/SplitPanelItem";
import {Button} from "../component/Button";
import {DesignerSurfacePanel} from "./DesignerSurfacePanel";
import {Component} from "../component/Component";
import {PropertiesEditor} from "./PropertriesEditor";
import {EmittedCode} from "./EmittedCode";
import {replaceAll} from "../util/replaceAll";
import {CompilerOptions, DiagnosticCategory, JsxEmit, ScriptTarget} from "typescript";
import {CodeEditor} from "./CodeEditor";


export interface IComponentDesigner {
    isComponentDesignerImplementer: boolean;
    selectedComponents: Component[];
    designedComponent: Component;
    isComponentSelected(component: Component): boolean;
    selectComponent(component: Component): void;
    addComponentToSelection(component: Component): void;
    componentChanged(component: Component): void;
}


export class DesignerWindow extends BaseWindow implements IComponentDesigner {

    saveButton: Button = new Button();

    tabs: TabPanel = new TabPanel();
    designerTab: TabPanelItem = new TabPanelItem();
    codeTab: TabPanelItem = new TabPanelItem();

    designerSplitPanel: SplitPanel = new SplitPanel();
    designerSurface: SplitPanelItem = new SplitPanelItem();
    designerPropertyEditor: SplitPanelItem = new SplitPanelItem();

    but1: Button = new Button();

    surface: DesignerSurfacePanel = new DesignerSurfacePanel();

    propertiesEditor: PropertiesEditor = new PropertiesEditor();
    codeEditor: CodeEditor = new CodeEditor();


    // ------------------------------ designedComponent ------------------------------
    protected _designedComponent: Component;
    get designedComponent(): Component {
        return this._designedComponent;
    }

    set designedComponent(value: Component) {
        value.designer=this;
        this.setPropertyWithForceUpdate("_designedComponent", value);
    }

    get isComponentDesignerImplementer(): boolean {
        return true;
    }

    // ------------------------------ designedComponentPath ------------------------------
    _designedComponentPath: string;
    get designedComponentPath(): string {
        return this._designedComponentPath;
    }

    set designedComponentPath(value: string) {
        this._designedComponentPath = replaceAll(value, "\\", "/");
    }


    selectedComponents: Component[] = [];

    isComponentSelected(component: Component): boolean {
        return this.selectedComponents.indexOf(component) >= 0;
    }

    selectComponent(component: Component) {
        this.selectedComponents = [component];
        this.propertiesEditor.editedObject = component;
        this.refresh();
    }

    componentChanged(component: Component) {
        this.propertiesEditor.refresh();
        this.surface.refresh();
    }

    addComponentToSelection(component: Component) {
        this.selectedComponents.push(component);
        this.refresh();
    }

    init() {
        if (this.initialized) return;
        super.init();

        this.top = 10;
        this.left = 10;
        this.width = 800;
        this.height = 800;

        this.tabs.top = 100;
        this.tabs.left = 10;
        this.tabs.right = 10;
        this.tabs.bottom = 10;
        this.childrenAdd(this.tabs);

        this.saveButton.text = "Сохранить";
        this.saveButton.top = 5;
        this.saveButton.left = 5;
        this.saveButton.onClick = () => {
            this.save();
        };
        this.childrenAdd(this.saveButton);


        this.designerTab.text = "Дизайнер";
        this.designerTab.icon = "vendor/fugue/icons-shadowless/user.png";
        this.tabs.childrenAdd(this.designerTab);

        this.codeTab.text = "Код";
        this.codeTab.icon = "vendor/fugue/icons-shadowless/cross.png";
        this.tabs.childrenAdd(this.codeTab);

        this.designerSplitPanel.top = 10;
        this.designerSplitPanel.left = 10;
        this.designerSplitPanel.right = 10;
        this.designerSplitPanel.bottom = 10;

        //this.designerSurface.wi
        this.designerSplitPanel.childrenAdd(this.designerSurface);
        this.designerSplitPanel.childrenAdd(this.designerPropertyEditor);

        this.designerTab.childrenAdd(this.designerSplitPanel);

        this.propertiesEditor.top = 10;
        this.propertiesEditor.left = 10;
        this.propertiesEditor.right = 10;
        this.propertiesEditor.bottom = 10;
        this.designerPropertyEditor.childrenAdd(this.propertiesEditor);

        this.codeEditor.top = 10;
        this.codeEditor.left = 10;
        this.codeEditor.right = 10;
        this.codeEditor.bottom = 10;
        this.codeTab.childrenAdd(this.codeEditor);

        this.but1.text = "это surface";
        this.but1.top = 10;
        this.but1.left = 10;

        this.surface.top = 10;
        this.surface.left = 10;
        this.surface.right = 10;
        this.surface.bottom = 10;
        this.surface.designerWindow = this;
        this.designerSurface.childrenAdd(this.surface);

        //////////////////////////////////


        this.codeEditor.code = fs.readFileSync(this.designedComponentPath, "utf8");

        let formModule = require("../../" + this.designedComponentPath.replace(".ts", ".js"));


        let formClassName: string = "";
        // ищем объект дизайнера - это первый class, который наследован от Component
        for (let moduleClass of Object.keys(formModule)) {
            if (Component.isPrototypeOf(formModule[moduleClass])) {
                formClassName = moduleClass;
            }
        }
        if (formClassName === "") {
            throw  "Не найден объект для дизайна в файле '" + this.designedComponentPath + "'";
        }


        this.designedComponent = new formModule[formClassName]() as Component;
        this.designedComponent.designMode = true;
        this.designedComponent.init();


        //this.designedComponent = new TestWindow2();
        //this.designedComponent.parent = this;
        //this.designedComponent.designMode = true;
        //this.designedComponent.init();
    }

    save() {
        if (!this.designedComponent) {
            console.log(this.constructor.name + ".save(): нет designedForm");
            return;
        }
        let e = new EmittedCode();
        this.designedComponent.emitCode(e);

        let codeLines: string[];
        codeLines = this.codeEditor.code.split("\n");

        let empty: string[] = [];
        let beforeDecl: string[] = [];
        let afterDeclBeforeInit: string[] = [];
        let afterInit: string[] = [];

        let newCode = beforeDecl;
        for (let line of codeLines) {
            if (line.indexOf("//=== BEGIN-DESIGNER-DECLARE-CODE ===//") > 0) {
                newCode.push(line);
                newCode.push(e.getDeclaresCode());
                newCode = empty;
                continue;
            }
            if (line.indexOf("//=== END-DESIGNER-DECLARE-CODE ===//") > 0) {
                newCode = afterDeclBeforeInit;
            }
            if (line.indexOf("//=== BEGIN-DESIGNER-INIT-CODE ===//") > 0) {
                newCode.push(line);
                newCode.push(e.getInitsCode());
                newCode = empty;
                continue;
            }
            if (line.indexOf("//=== END-DESIGNER-INIT-CODE ===//") > 0) {
                newCode = afterInit;
            }
            newCode.push(line);

        }

        let code = beforeDecl.join("\n") + "\n" + afterDeclBeforeInit.join("\n") + "\n" + afterInit.join("\n") + "\n";
        this.codeEditor.code = code;

        let p = path.parse(this.designedComponentPath);
        let bakFileName = p.dir + "/" + p.name + ".bak";
        let jsFileName = p.dir + "/" + p.name + ".js";

        console.log(this.designedComponentPath, bakFileName);
        //fs.renameSync(this.designedComponentPath, bakFileName);
        //fs.writeFileSync(this.designedComponentPath, code);

        console.log(code);

        let ts = require("typescript");

        let compilerOptions: CompilerOptions = {
            module: ts.ModuleKind.CommonJS,
            noEmitOnError: true,
            sourceMap: false,
            removeComments: true,
            target: ScriptTarget.ES2017,
            jsx: JsxEmit.React,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            noImplicitThis: true,
            strictNullChecks: true,
            lib: [
                "es2017",
                "dom"
            ],
            skipLibCheck: true
        };

        let res = ts.transpileModule(code, {
            reportDiagnostics: true,
            compilerOptions: compilerOptions,
            fileName: this.designedComponentPath
        });

        // let xxx=eval(res.outputText);
        //console.log(res.diagnostics);

        let errors: string[] = [];
        for (let diag of res.diagnostics) {
            if (diag.category === DiagnosticCategory.Error) {
                errors.push("ошибка!  " + diag.messageText);
            }
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
        }
        //else
          //  fs.writeFileSync(jsFileName, res.outputText);

        console.log(res.outputText);

        // reload module
        Object.keys(require.cache).forEach(module => {
            if (replaceAll(module, "\\", "/").indexOf(jsFileName) >= 0) {
                delete require.cache[module];
                console.log("module reloaded-> " + module);
            }
        });


    }
}