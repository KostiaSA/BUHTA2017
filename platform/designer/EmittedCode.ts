export class EmittedImport {
    literal: string;
    modulePath: string;
}

export class EmittedCode {
    imports: EmittedImport[] = [];
    declares: string[] = [];
    inits: string[] = [];

    emitDeclaration(varName: string, type: string) {
        this.declares.push("    " + varName + ":" + type + " = new " + type + "();");
    }

    emitNumberValue(component: any, varName: string, defaultValue?: any) {
        if (component[varName] !== undefined && (defaultValue === undefined || defaultValue !== component[varName])) {
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "=" + component[varName] + ";");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "=" + component[varName] + ";");
        }
    }

    emitBooleanValue(component: any, varName: string, defaultValue?: boolean) {
        if (component[varName] !== undefined && (defaultValue === undefined || defaultValue !== component[varName])) {
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "=" + component[varName] + ";");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "=" + component[varName] + ";");
        }
    }

    emitStringValue(component: any, varName: string, defaultValue?: any) {
        if (component[varName] !== undefined && (defaultValue === undefined || defaultValue !== component[varName])) {
            if (component === component.owner)
                this.inits.push("        " + "this." + varName + "=" + JSON.stringify(component[varName]) + ";");
            else
                this.inits.push("        " + "this." + component.name + "." + varName + "=" + JSON.stringify(component[varName]) + ";");
        }
    }

    emitEventValue(component: any, varName: string) {
        if (component[varName] !== undefined) {
            for (let propName of Object.getOwnPropertyNames(Object.getPrototypeOf(component.owner))) {
                if (component[varName] === component.owner[propName]) {
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
        //code.push("    " + "//=== код дизайнера (конструктор начало) ===//");
        for (let str of this.inits) {
            code.push(str);
        }
        //code.push("    " + "//=== код дизайнера (конструктор конец) ===//");
        return code.join("\n");
    }

    getDeclaresCode(): string {
        let code: string[] = [];
        //code.push("    " + "//=== код дизайнера (объявление свойств начало) ===//");
        for (let str of this.declares) {
            code.push(str);
        }
        //code.push("    " + "//=== код дизайнера (объявление свойств конец) ===//");
        return code.join("\n");
    }

}