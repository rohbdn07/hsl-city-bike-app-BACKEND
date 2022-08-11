/**
 *        @file station.service.ts
 *     @summary Station service to interact with database through TypeoORM
 * @description Define Functions that get station list data(rows) and also, gets data by station_id
 * through repository
 *   @functions - getStationRows()
 *              - getInfoById()
 *              - startsAndEndsJourney()
 *              - stationInfo()
 */

import StationRepository from "../database/repository";
import { IStationQuery } from "../interface/interfaces";

/**
 *
 * @param stationId id of station
 * @param stationName name of station
 * @param page current page number
 * @param count no. of data(rows) to display through pagination
 * @returns data to station controller
 */
export const getStationRows = async ({
    stationid,
    stationName,
    page,
    count,
}) => {
    const pageSize = (parseInt(page) - 1) * parseInt(count);
    try {
        const response = await StationRepository.getRowsOfStation({
            pageSize,
            count,
            stationName,
            stationid,
        });
        if (response?.data.length > 0) {
            const totalRows = response?.totalCounts;
            const hslData = response?.data;
            const counts = parseInt(count)
                ? !isNaN(parseInt(count))
                    ? totalRows >= parseInt(count)
                        ? parseInt(count)
                        : totalRows
                    : parseInt("0")
                : undefined;
            return {
                success: true,
                message: "successfully got the data from database",
                data: {
                    totalRows,
                    counts,
                    hslData,
                },
            };
        } else {
            return {
                success: false,
                message: "No data found with that search or params",
            };
        }
    } catch (error) {
        return {
            success: false,
            message:
                "Oppps! Something went wrong...Please check params values.",
        };
    }
};

/**
 *
 * @param month name of the month
 * @param id station id
 * @returns data to station controller
 */
export const getInfoById = async (month: string, id: number) => {
    try {
        if (month && id) {
            const getStationDataByMonth =
                await StationRepository.getRowsOfStationByIdAndMonth(month, id);
            const getStationInfoById = await StationRepository.getRowsOfStation(
                {
                    stationid: id,
                }
            );
            if (
                getStationDataByMonth?.data.length > 0 &&
                getStationInfoById?.data.length > 0
            ) {
                const totalJourney = getStationDataByMonth?.totalCounts;
                const hslData = getStationDataByMonth?.data;
                const stationInfoData = getStationInfoById?.data;
                const monthName = getStationDataByMonth?.month;
                const startAndEndJourney = startsAndEndsJourney(hslData, id);
                const avgDistanceStartAndEnd = calculateAverageDistance(
                    hslData,
                    id
                );
                const detailsOfTheStation = stationInfo(stationInfoData, id);

                return {
                    success: true,
                    message: "successfully got the data from database",
                    data: {
                        month: monthName,
                        totalJourney,
                        ...startAndEndJourney,
                        ...detailsOfTheStation,
                        ...avgDistanceStartAndEnd,
                    },
                };
            } else {
                return {
                    success: false,
                    message: "No data found with that search or params",
                };
            }
        }
    } catch (error) {
        console.log("the error", error);
    }
};

// return calculated total values of starting and ending journey from single station
function startsAndEndsJourney(hslData, id) {
    let totalJourneyStarting = 0;
    let totalJourneyEnding = 0;
    if (hslData.length > 0) {
        hslData?.forEach((item) => {
            if (item.departure_station_id === parseInt(id)) {
                totalJourneyStarting += 1;
                return totalJourneyStarting;
            } else if (item.return_station_id === parseInt(id)) {
                totalJourneyEnding += 1;
                return totalJourneyEnding;
            } else {
                return item;
            }
        });
        return {
            totalJourneyStarting,
            totalJourneyEnding,
        };
    }
}

// return information about the station
function stationInfo(stationInfoData, id) {
    let station_id;
    let station_name;
    let station_address;
    let station_kaupunki;
    let station_capacity;
    if (stationInfoData.length > 0) {
        stationInfoData?.forEach((item) => {
            if (item.station_id === parseInt(id)) {
                station_id = item.station_id;
                station_name = item.name;
                station_address = item.address;
                station_kaupunki =
                    item.kaupunki == " " ? undefined : item.kaupunki;
                station_capacity = item.kapasiteet;
            } else {
                return item;
            }
        });
        const obj = {
            stationId: station_id,
            stationName: station_name,
            address: station_address,
            kaupunki: station_kaupunki,
            capacity: station_capacity,
        };
        // it remove if any of the properties from the obj is empty
        // then return object with required data
        return Object.entries(obj).reduce(
            (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
            {}
        );
    }
}

function calculateAverageDistance(hslData, id) {
    let total_distance_starting = 0;
    let total_distance_ending = 0;
    if (hslData.length > 0) {
        hslData?.forEach((item) => {
            if (item.departure_station_id === parseInt(id)) {
                total_distance_starting += item.distance_meter;
                return total_distance_starting;
            } else if (item.return_station_id === parseInt(id)) {
                total_distance_ending += item.distance_meter;
            } else {
                return item;
            }
        });
        const startAndEndJourney = startsAndEndsJourney(hslData, id);
        if (startAndEndJourney) {
            const startingDistanceInKilometer = parseFloat(
                (total_distance_starting / 1000).toFixed(2)
            );
            const endingDistanceInKilometer = parseFloat(
                (total_distance_ending / 1000).toFixed(2)
            );

            const avgDistanceStarting_KM = parseFloat(
                parseFloat(
                    `${
                        startingDistanceInKilometer /
                        startAndEndJourney?.totalJourneyStarting
                    }`
                ).toFixed(2)
            );
            const avgDistanceEnding_KM = parseFloat(
                parseFloat(
                    `${
                        endingDistanceInKilometer /
                        startAndEndJourney?.totalJourneyEnding
                    }`
                ).toFixed(2)
            );

            return {
                avgDistanceStarting_KM,
                avgDistanceEnding_KM,
            };
        }
    }
}
