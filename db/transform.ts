import {
    Charger,
    ChargingStation,
    ChargingStationInfo,
    ConnectorSummary,
} from '../features/charging-station/types'
import { ConnectorRowWithChargerName, StationRow } from './types'

export const toStationsList = (
    rawData: StationRow[],
    connectorMap: Map<number, ConnectorSummary[]>
) => {
    const list: ChargingStation[] = []

    for (const row of rawData) {
        const item = {
            id: row.id,
            name: row.name,
            address: {
                street: row.street,
                city: row.city,
                country: row.country,
            },
            connectors: connectorMap.get(row.id) || [],
        }

        list.push(item)
    }

    return list
}

export const toStationInfo = (
    station: StationRow,
    connectorRows: ConnectorRowWithChargerName[]
) => {
    const { connectorMap, chargerNameMap } = getHelperMaps(connectorRows)

    const chargers: Charger[] = []

    for (const [key, value] of chargerNameMap) {
        const ch: Charger = {
            id: key,
            name: value,
            connectors: connectorMap.get(key) || [],
        }

        chargers.push(ch)
    }

    const stationInfo: ChargingStationInfo = {
        id: station.id,
        name: station.name,
        address: {
            street: station.street,
            city: station.city,
            country: station.country,
        },
        chargers,
    }

    return stationInfo
}
