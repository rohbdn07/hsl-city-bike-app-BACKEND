import { Response, Request } from "express";
import { EntitySchema, Repository } from "typeorm";
import { table_2021_05 } from "../database/entity/2021_05_hsl_entity";

export interface IGetRowsResult {
    success: boolean;
    message: string;
    data?: any;
}

export interface IExtendsRequest extends Request {
    name: string;
}

export interface ITableName {
    tableName: Repository<EntitySchema>;
    departureStationName: EntitySchema<string>;
}

export type GetRowsOfTheMonthProps = {
    month: string;
    searchQuery: string;
    pageSize: number;
    count: number;
};
