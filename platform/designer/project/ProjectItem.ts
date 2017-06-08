import {Project} from "./Project";

let fs = require("fs");
let path = require("path");

export class ProjectItem {
    name: string;
    parent: ProjectItem;
    project: Project;
    items: ProjectItem[] = [];


    getDesignerLabel(): string {
        return this.name;
    }

    getDesignerImage(): string {
        return undefined as any;
    }


    getFullPath(): string {
        return path.join(this.parent.getFullPath(), this.name);
    }

    getRelativePath(): string {
        return path.join(this.parent.getRelativePath(), this.name);
    }

    loadItems() {

        let ProjectComponent = require("./ProjectComponent").ProjectComponent;
        let ProjectFolder = require("./ProjectFolder").ProjectFolder;
        let ProjectImage= require("./ProjectImage").ProjectImage;

        let dir: string=this.getFullPath();
        //console.log("loadItems", dir, this.name);

        fs.readdirSync(dir).forEach((file: string) => {

            //console.log("loadItems-forEach", file);

            let stat = fs.statSync(path.join(dir, file));
            if (stat.isDirectory()) {
                if (
                    file.indexOf(".git") === -1 &&
                    file.indexOf(".idea") === -1 &&
                    file.indexOf(".vs") === -1 &&
                    file.indexOf("node_modules") === -1 &&
                    file.indexOf("vendor") === -1
                ) {

                    let folderItem = new ProjectFolder();
                    folderItem.parent = this;
                    folderItem.name = file;
                    this.items.push(folderItem);
                    folderItem.loadItems();
                }
            }
            else {
                if (file.endsWith(".ts") || file.endsWith(".tsx")) {
                    let componentItem = new ProjectComponent();
                    componentItem.parent = this;
                    componentItem.name = file;
                    this.items.push(componentItem);
                    //console.log(componentItem.getRelativePath());
                }
                else
                if (file.endsWith(".png") || file.endsWith(".jpg")) {
                    let componentItem = new ProjectImage();
                    componentItem.parent = this;
                    componentItem.name = file;
                    this.items.push(componentItem);
                    //console.log(componentItem.getRelativePath());
                }
            }

        });

    }
}