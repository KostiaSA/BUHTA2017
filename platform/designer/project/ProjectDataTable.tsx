import * as React from "react";
import {Project} from "./Project";
import {DataRow} from "../../data/DataRow";
import {ProjectItem} from "./ProjectItem";
import {DataTable} from "../../data/DataTable";
import {DataColumn} from "../../data/DataColumn";


export class ProjectItemDataRow extends DataRow {
    item: ProjectItem;
    itemName: string;
    // parentItem: ProjectItem;
    // parentItemName: string;
}

export class ProjectItemDataTable extends DataTable<DataColumn, ProjectItemDataRow> {

    project: Project;

    item: DataColumn;
    itemName: DataColumn;

    constructor() {
        super();
        this.treeView = true;

        this.item = new DataColumn();
        this.item.dataType = "object";
        this.item.fieldName = "item";
        this.item.hidden = true;
        this.childrenAdd(this.item);

        this.itemName = new DataColumn();
        this.itemName.dataType = "string";
        this.itemName.fieldName = "itemName";
        this.childrenAdd(this.itemName);


        // this.idColumn = this.itemName;
        // this.parentIdColumn = this.parentItemName;
    }

    processItem(item: ProjectItem, parentRow?: ProjectItemDataRow): ProjectItemDataRow {
        let row = new ProjectItemDataRow();
        row.item = item;
        row.itemName = item.getDesignerLabel();
        row.__icon__ = item.getDesignerImage();
        if (parentRow) {
            if (!parentRow.__children__)
                parentRow.__children__ = [];
            parentRow.__children__.push(row);
        }
        for (let child of item.items) {
            this.processItem(child, row);
        }
        return row;

    }

    async getRows(): Promise<ProjectItemDataRow[]> {


        if (this.project) {

            //let row = new ProjectItemDataRow();
            //row.item = this.project;
            //row.itemName = this.project.getDesignerLabel();
            //row.__icon__ = this.project.getDesignerImage();

            let root = this.processItem(this.project);

            return Promise.resolve([root]);

        }
        else
            return Promise.resolve([]);
    }

}