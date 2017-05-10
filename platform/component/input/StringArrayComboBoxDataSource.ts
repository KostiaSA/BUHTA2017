import {IComboBoxDataSource} from "./IComboBoxDataSource";


export class StringArrayComboBoxDataSource implements IComboBoxDataSource {
    private dict: { [value: string]: any; } = {};

    constructor(public list: any[]) {

        for (let item of list) {
            this.dict[item.toString()] = {value: item, title: item.toString(), image: undefined};
        }
    }

    getLookupDelayMs(): number {
        return 300;
    }

    isComboBoxDataSource(): boolean {
        return true;
    }

    getValueFieldName(): string {
        return "value";
    }

    getTitleFieldName(): string {
        return "title";
    }

    getImageFieldName(): string {
        return "image";
    }

    getRowByValue(value: any): Promise<any> {
        return Promise.resolve(this.dict[value.toString()]);
    }

    getRows(filterStr: string, maxRows: number): Promise<any[]> {
        filterStr = filterStr.toLowerCase();
        let ret: any[] = [];
        for (let item of this.list) {
            if (item.toString().toLowerCase().indexOf(filterStr) > -1) {
                let obj = this.dict[item.toString()];
                obj.filterStr = filterStr;
                ret.push(obj);
            }
        }
        if (ret.length === 0)
            ret.push({value: "<пусто>", title: "<пусто>", image: undefined});
        return Promise.resolve(ret);
    }
}

