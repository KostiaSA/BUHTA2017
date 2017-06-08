import {ProjectItem} from "./ProjectItem";

export interface IProjectConfig {

}


export class Project extends ProjectItem {
    rootPath: string = "c:/--BUHTA2017--/";
    config: IProjectConfig;
    name: string = "приложение";


    getDesignerImage(): string {
        return "vendor/fugue/icons/application-blog.png";
    }

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
