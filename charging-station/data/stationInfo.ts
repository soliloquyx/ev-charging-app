import * as SQLite from 'expo-sqlite'
import { ConnectorRow, StationRow } from './types'
import { toStationInfo } from './transform'

export const getStationInfo = async (db: SQLite.SQLiteDatabase, id: number) => {
    const stationRow = await db.getFirstAsync<StationRow>('SELECT * FROM stations WHERE id = ?', id)

    if (!stationRow) {
        throw new Error(`Station with id ${id} not found`)
    }

    const connectorRows = await db.getAllAsync<ConnectorRow & { charger_name: string }>(
        `
        SELECT
            ch.name AS charger_name,
            con.*
        FROM chargers AS ch
        JOIN connectors AS con ON ch.id = con.charger_id
        WHERE ch.station_id = ?
    `,
        id
    )

    const stationInfo = toStationInfo(stationRow, connectorRows)

    return stationInfo
}
