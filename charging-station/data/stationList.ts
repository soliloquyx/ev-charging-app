import * as SQLite from 'expo-sqlite'

import { ConnectorSummaryRow, StationRow } from './types'
import { getConnectorSummaryMap, toStationList } from './transform'

export const getStationList = async (db: SQLite.SQLiteDatabase) => {
    const stationRows = await db.getAllAsync<StationRow>('SELECT * FROM stations')

    const connectorSummaryRows = await db.getAllAsync<ConnectorSummaryRow>(`
        SELECT station_id, type, SUM(available) AS available
        FROM connectors con
        JOIN chargers ch ON con.charger_id = ch.id
        GROUP BY station_id, type
    `)

    const connectorMap = getConnectorSummaryMap(connectorSummaryRows)

    const list = toStationList(stationRows, connectorMap)
    return list
}
