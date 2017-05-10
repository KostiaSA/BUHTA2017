export interface IComboBoxDataSource {
    isComboBoxDataSource(): boolean;
    getLookupDelayMs(): number;
    getValueFieldName(): string;
    getTitleFieldName(): string;
    getImageFieldName(): string;
    getRowByValue(value: any): Promise<any>;
    getRows(filterStr: string, maxRows: number): Promise<any[]>;
}