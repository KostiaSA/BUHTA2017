export type SqlDialect = "mssql" | "mysql" | "pgsql";

export class SqlConnect {
    name: string;
    dialect: SqlDialect;
    isNonVisual(): boolean {
        return true;
    }

}