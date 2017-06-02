import {DataTable} from "../data/DataTable";
import {DataColumn} from "../data/DataColumn";
import {DataRow} from "../data/DataRow";
import {Component} from "../component/Component";


export class DesignerTreeDataRow extends DataRow {
    component: Component;
    componentName: string;
    parentComponent: Component;
}

export class DesignerTreeDataTable extends DataTable<DataColumn, DesignerTreeDataRow> {

    designedComponent: Component;

    component: DataColumn;
    componentName: DataColumn;
    parentComponent: DataColumn;

    init() {
        this.idColumn = this.component;
        this.parentIdColumn = this.parentComponent;
        this.treeView = true;

        this.component = new DataColumn();
        this.component.dataType = "object";
        this.component.name = "comp";
        this.component.hidden = true;
        this.childrenAdd(this.component);

        this.componentName = new DataColumn();
        this.componentName.dataType = "string";
        this.componentName.name = "comp_name";
        this.childrenAdd(this.componentName);

        this.parentComponent = new DataColumn();
        this.parentComponent.dataType = "object";
        this.parentComponent.name = "comp_parent";
        this.parentComponent.hidden = true;
        this.childrenAdd(this.parentComponent);
    }


    processComponent(comp: Component, rows: DesignerTreeDataRow[]) {
        let row = new DesignerTreeDataRow();
        row.component = comp;
        row.componentName = comp.name;
        row.parentComponent = comp.parent;
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