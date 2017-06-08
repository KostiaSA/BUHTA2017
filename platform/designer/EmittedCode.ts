import {Component} from "../component/Component";
export class EmittedImport {
    literal: string;
    modulePath: string;
}

export class EmittedCode {
    imports: EmittedImport[] = [];
    declares: string[] = [];
    creates: string[] = [];
    inits: string[] = [];

    emitDeclaration(varName: string, type: string) {
        this.declares.push("    " + varName + ":" + type +  ";");
    }

    emitCreate(varName: string, type: string) {
        this.creates.push("        this." + varName + " = new " + type + "();");
    }

    emitNumberValue(component: Component, varName: string) {
        if (component.getPropertyValue(varName) !==component.getPropertyDefaultValue(varName)) {
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "=" + component.getPropertyValue(varName) + ";");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "=" + component.getPropertyValue(varName) + ";");
        }
    }

    emitBooleanValue(component: Component, varName: string) {
        //if (component[varName] !== undefined && (defaultValue === undefined || defaultValue !== component[varName])) {
        if (component.getPropertyValue(varName) !==component.getPropertyDefaultValue(varName)) {
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "=" + component.getPropertyValue(varName) + ";");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "=" + component.getPropertyValue(varName) + ";");
        }
    }

    emitStringValue(component: Component, varName: string) {
        if (component.getPropertyValue(varName) !==component.getPropertyDefaultValue(varName)) {
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "=" + JSON.stringify(component.getPropertyValue(varName)) + ";");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "=" + JSON.stringify(component.getPropertyValue(varName)) + ";");
        }
    }

    emitEventValue(component: Component, varName: string) {
        if (component.getPropertyValue(varName) !==component.getPropertyDefaultValue(varName)) {
            for (let propName of Object.getOwnPropertyNames(Object.getPrototypeOf(component.owner))) {
                if (component.getPropertyDefaultValue(varName) === component.owner.getPropertyDefaultValue(propName)) {
                    if (component === component.owner)
                        this.inits.push("        " + "this." + varName + "= this." + propName + ";");
                    else
                        this.inits.push("        " + "this." + component.name + "." + varName + "= this." + propName + ";");
                    return
                }
            }
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "= this.!ошибка не найдено '" + varName + "';");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "= this.!ошибка не найдено '" + varName + "';");
        }
    }

    getInitsCode(): string {
        let code: string[] = [];
        for (let str of this.inits) {
            code.push(str);
        }
        return code.join("\n");
    }

    getDeclaresCode(): string {
        let code: string[] = [];
        for (let str of this.declares) {
            code.push(str);
        }
        return code.join("\n");
    }

    getCreatesCode(): string {
        let code: string[] = [];
        for (let str of this.creates) {
            code.push(str);
        }
        return code.join("\n");
    }

}