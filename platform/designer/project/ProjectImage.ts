import {ProjectItem} from "./ProjectItem";
import {replaceAll} from "../../util/replaceAll";

export  class ProjectImage extends ProjectItem{
    getDesignerImage(): string {
        return  replaceAll(this.getRelativePath(), "\\", "/");
    }
}
