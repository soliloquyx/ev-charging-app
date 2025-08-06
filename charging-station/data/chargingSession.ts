import * as SQLite from 'expo-sqlite'

import { ChargingSessionRow } from './types'
import { toChargingSession } from './transform'

export const fetchChargingSession = async (db: SQLite.SQLiteDatabase, id: number) => {
    const session = await db.getFirstAsync<ChargingSessionRow>(
        `
        SELECT
            cs.*,
            ch.name AS charger_name,
            con.type AS connector_type
        FROM charging_sessions cs
        JOIN chargers ch ON cs.charger_id = ch.id
        JOIN connectors con ON cs.connector_id = con.id
        WHERE cs.id = ?
        `,
        id
    )

    return session ? toChargingSession(session) : null
}

export const fetchLatestChargingSession = async (db: SQLite.SQLiteDatabase) => {
    const session = await db.getFirstAsync<ChargingSessionRow>(
        `
        SELECT
            cs.*,
            ch.name AS charger_name,
            con.type AS connector_type
        FROM charging_sessions cs
        JOIN chargers ch ON cs.charger_id = ch.id
        JOIN connectors con ON cs.connector_id = con.id
        ORDER BY cs.id DESC
        LIMIT 1
        `
    )

    return session ? toChargingSession(session) : null
}

export const saveNewChargingSession = async (
    db: SQLite.SQLiteDatabase,
    stationId: number,
    chargerId: number,
    connectorId: number
) => {
    const result = await db.runAsync(
        `
        INSERT INTO charging_sessions (station_id, charger_id, connector_id, is_active)
        VALUES (?, ?, ?, 1);
        `,
        stationId,
        chargerId,
        connectorId
    )

    const session = await fetchChargingSession(db, result.lastInsertRowId)

    return session
}

export const finishChargingSession = async (db: SQLite.SQLiteDatabase, id: number) => {
    const result = await db.runAsync(
        `
        UPDATE charging_sessions
        SET is_active = false
        WHERE id = ?
        `,
        id
    )

    const session = await fetchChargingSession(db, result.lastInsertRowId)

    return session
}
