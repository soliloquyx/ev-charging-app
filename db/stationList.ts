import * as SQLite from 'expo-sqlite'

import { ConnectorSummary } from '../features/charging-station/types'
import { ConnectorSummaryRow, StationRow } from './types'
import { toStationsList } from './transform'

const getConnectorSummaryMap = (rawData: ConnectorSummaryRow[]) => {
    const connectorMap = new Map<number, ConnectorSummary[]>()

    for (const row of rawData) {
        const sum: ConnectorSummary = {
            type: row.type,
            available: row.available,
        }

        if (connectorMap.has(row.station_id)) {
            connectorMap.get(row.station_id)?.push(sum)
        } else {
            connectorMap.set(row.station_id, [sum])
        }
    }

    return connectorMap
}

export const getStationList = async (db: SQLite.SQLiteDatabase) => {
    const stationRows = await db.getAllAsync<StationRow>('SELECT * FROM stations')

    const connectorSummaryRows = await db.getAllAsync<ConnectorSummaryRow>(`
        SELECT station_id, type, SUM(available) AS available
        FROM connectors con
        JOIN chargers ch ON con.charger_id = ch.id
        GROUP BY station_id, type
    `)

    const connectorMap = getConnectorSummaryMap(connectorSummaryRows)

    const list = toStationsList(stationRows, connectorMap)
    return list
}
