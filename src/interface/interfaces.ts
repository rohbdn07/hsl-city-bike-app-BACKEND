import { Response, Request } from "express";
import { EntitySchema, Repository } from "typeorm";

export interface IGetRowsResult {
    success: boolean;
    message: string;
    data?: Data;
}

interface Data {
    monthName: string;
    counts: number;
    totalRows: [];
    hslData: [];
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
    pageSize?: number;
    count: number;
    page?: number;
};

export interface IStationQuery {
    stationid?: number;
    stationName?: string;
    pageSize?: number;
    count?: number;
    page?: string;
}

export interface IStationById {
    id: number;
}
