import { ConnectorType } from '../shared'
import { ChargingSession, DB } from './types'
import { Dto } from '../shared'

export const transformStations = (db: DB) => {
    const { stations, chargers, connectors } = db

    return stations.map((station) => {
        const stationChargers = chargers.filter((c) => c.stationId === station.id)

        const connectorMap = new Map<ConnectorType, Dto.ConnectorSummary>()

        for (const charger of stationChargers) {
            const chargerConnectors = connectors.filter((conn) => conn.chargerId === charger.id)

            for (const conn of chargerConnectors) {
                const existing = connectorMap.get(conn.type) || {
                    type: conn.type,
                    available: 0,
                    total: 0,
                    isOperational: false,
                }

                connectorMap.set(conn.type, {
                    ...existing,
                    available: existing.available + (conn.available ? 1 : 0),
                    total: existing.total + 1,
                    isOperational: existing.isOperational || conn.isOperational,
                })
            }
        }

        return {
            id: station.id,
            name: station.name,
            address: station.address,
            connectors: Array.from(connectorMap.values()),
        }
    })
}

export const transformStationInfo = (db: DB, id: number) => {
    const station = db.stations.find((s) => s.id === id)
    if (!station) return undefined

    const chargers = db.chargers
        .filter((ch) => ch.stationId === id)
        .map((ch) => ({
            ...ch,
            connectors: db.connectors.filter((conn) => conn.chargerId === ch.id),
        }))

    const info: Dto.StationInfo = {
        ...station,
        chargers,
    }

    return info
}

export const transformChargingSession = (
    db: DB,
    session: ChargingSession
): Dto.ChargingSession | undefined => {
    const charger = db.chargers.find((c) => c.id === session.chargerId)
    const connector = db.connectors.find((c) => c.id === session.connectorId)
    const station = charger ? db.stations.find((s) => s.id === charger.stationId) : undefined

    if (!charger || !connector || !station) {
        return undefined
    }

    return {
        id: session.id,
        isActive: session.isActive,
        station: {
            name: station.name,
            address: station.address,
        },
        charger: {
            id: charger.id,
            name: charger.name,
        },
        connector: {
            id: connector.id,
            type: connector.type,
        },
    }
}
