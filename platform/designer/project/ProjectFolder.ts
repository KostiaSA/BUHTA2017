import {ProjectItem} from "./ProjectItem";

export  class ProjectFolder extends ProjectItem{
    getDesignerImage(): string {
        return "vendor/fugue/icons/folder-horizontal.png";
    }

}
