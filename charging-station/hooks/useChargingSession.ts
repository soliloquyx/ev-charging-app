import { useCallback, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

import type { ChargingSession } from 'charging-station/types'
import {
    fetchLatestChargingSession,
    finishChargingSession,
    saveNewChargingSession,
    updateConnectorAvailability,
} from '@data/chargingSession'

type UseChargingSessionOptions = {
    updateStationList: () => Promise<void>
}

export const useChargingSession = ({ updateStationList }: UseChargingSessionOptions) => {
    const db = useSQLiteContext()

    const [session, setSession] = useState<ChargingSession | null>(null)
    const [loading, setLoading] = useState(false)

    const startCharging = async (stationId: number, chargerId: number, connectorId: number) => {
        const s = await saveNewChargingSession(db, stationId, chargerId, connectorId)
        await updateConnectorAvailability(db, connectorId, false)
        setSession(s)
        await updateStationList()
    }

    const getChargingSession = useCallback(async () => {
        setLoading(true)
        const s = await fetchLatestChargingSession(db)
        setSession(s)
        setLoading(false)
    }, [db])

    const finishCharging = useCallback(
        async (sessionId: number, connectorId: number) => {
            const s = await finishChargingSession(db, sessionId)
            await updateConnectorAvailability(db, connectorId, true)
            setSession(s)
            await updateStationList()
        },
        [db, updateStationList]
    )

    return { session, startCharging, getChargingSession, finishCharging, loading }
}
