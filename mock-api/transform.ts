import { ConnectorType } from '../shared'
import { DB } from './types'
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
