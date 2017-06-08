import {ProjectItem} from "./ProjectItem";

export interface IProjectConfig {

}


export class Project extends ProjectItem {
    rootPath: string = "c:/--BUHTA2017--/";
    config: IProjectConfig;
    name: string = "";

    getFullPath(): string {
        return this.rootPath;
    }

    getRelativePath(): string {
        return "";
    }

    load() {
        this.loadConfig();
        this.loadItems();
    }

    loadConfig() {

    }

}
