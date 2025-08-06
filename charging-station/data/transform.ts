import {
    Charger,
    ChargingSession,
    ChargingStation,
    ChargingStationInfo,
    Connector,
    ConnectorSummary,
} from 'charging-station/types'
import { ChargingSessionRow, ConnectorRowWithChargerName, StationRow } from './types'

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

export const toChargingSession = (raw: ChargingSessionRow): ChargingSession => ({
    id: raw.id,
    stationId: raw.station_id,
    chargerId: raw.charger_id,
    connectorId: raw.connector_id,
    isActive: raw.is_active === 1,
    connectorType: raw.connector_type,
    chargerName: raw.charger_name,
})

const getHelperMaps = (rawData: ConnectorRowWithChargerName[]) => {
    const connectorMap = new Map<number, Connector[]>()
    const chargerNameMap = new Map<number, string>()

    for (const row of rawData) {
        if (!chargerNameMap.has(row.charger_id)) {
            chargerNameMap.set(row.charger_id, row.charger_name)
        }

        const con: Connector = {
            id: row.id,
            chargerId: row.charger_id,
            type: row.type,
            identifier: row.identifier,
            power: {
                unit: row.power_unit,
                value: row.power_value,
            },
            price: {
                value: row.price_value,
                currency: row.price_currency,
                unit: row.price_unit,
            },
            speed: row.speed,
            available: row.available,
        }

        if (connectorMap.has(row.charger_id)) {
            connectorMap.get(row.charger_id)?.push(con)
        } else {
            connectorMap.set(row.charger_id, [con])
        }
    }

    return { connectorMap, chargerNameMap }
}
