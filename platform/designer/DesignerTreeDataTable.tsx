import * as React from "react";
import {DataTable} from "../data/DataTable";
import {DataColumn} from "../data/DataColumn";
import {DataRow} from "../data/DataRow";
import {Component} from "../component/Component";
import {IGridCellRendererArgs} from "../component/Grid";


export class DesignerTreeDataRow extends DataRow {
    component: Component;
    get componentName(): string{
        return this.component.getDesignerLabel();
    }
//    componentName: string;
    parentComponent: Component;
    parentComponentName: string;
    // __getValue__(fieldName: string): any {
    //     return "999999999922222222";
    //     //return (this as any)[fieldName];
    // }

}

export class DesignerTreeDataTable extends DataTable<DataColumn, DesignerTreeDataRow> {

    designedComponent: Component;

    component: DataColumn;
    componentName: DataColumn;
    parentComponent: DataColumn;
    parentComponentName: DataColumn;

    constructor() {
        super();
        this.treeView = true;

        this.component = new DataColumn();
        this.component.dataType = "object";
        this.component.fieldName = "component";
        this.component.hidden = true;
        this.childrenAdd(this.component);

        this.componentName = new DataColumn();
        this.componentName.dataType = "string";
        this.componentName.fieldName = "componentName";
        this.childrenAdd(this.componentName);

        this.parentComponent = new DataColumn();
        this.parentComponent.dataType = "object";
        this.parentComponent.fieldName = "parentComponent";
        this.parentComponent.hidden = true;
        this.childrenAdd(this.parentComponent);

        this.parentComponentName = new DataColumn();
        this.parentComponentName.dataType = "string";
        this.parentComponentName.fieldName = "parentComponentName";
        //this.parentComponentName.hidden = true;
        this.parentComponentName.gridCellRenderer=(args:IGridCellRendererArgs)=>{
            return <div>"это парент div"</div>;
        };

        this.childrenAdd(this.parentComponentName);

        this.idColumn = this.componentName;
        this.parentIdColumn = this.parentComponentName;
    }

    processComponent(comp: Component, rows: DesignerTreeDataRow[]) {
        let row = new DesignerTreeDataRow();
        row.component = comp;
//        row.componentName = comp.constructor.name + "  (" + comp.name + ")";
        //row.componentName = comp.getDesignerLabel();
        row.__icon__ = comp.getDesignerImage();
        row.parentComponent = comp.parent;
        if (comp.parent) {
            //row.parentComponentName =comp.parent.constructor.name + "  (" + comp.parent.name + ")";
            row.parentComponentName = comp.parent.getDesignerLabel();
        }
        rows.push(row);

        for (let child of comp.children) {
            this.processComponent(child, rows);
        }

    }

    async getRows(): Promise<DesignerTreeDataRow[]> {
        let rows: DesignerTreeDataRow[] = [];
        if (this.designedComponent) {
            this.processComponent(this.designedComponent, rows);
        }
        return Promise.resolve(rows);
    }

}