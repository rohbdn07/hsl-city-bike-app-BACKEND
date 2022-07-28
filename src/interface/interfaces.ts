import { Response, Request } from "express";
import { EntitySchema, Repository } from "typeorm";

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

export interface IStationQuery {
    stationid: number;
    name: string;
    pageSize: number;
    count: number;
}
