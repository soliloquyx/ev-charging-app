import { useCallback, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

import type { ChargingSession } from '../types'
import {
    fetchLatestChargingSession,
    finishChargingSession,
    saveNewChargingSession,
} from '../../../db/chargingSession'

export const useChargingSession = () => {
    const db = useSQLiteContext()

    const [session, setSession] = useState<ChargingSession | null>(null)
    const [loading, setLoading] = useState(false)

    const startCharging = async (stationId: number, chargerId: number, connectorId: number) => {
        const s = await saveNewChargingSession(db, stationId, chargerId, connectorId)
        setSession(s)
    }

    const getChargingSession = useCallback(async () => {
        setLoading(true)
        const s = await fetchLatestChargingSession(db)
        setSession(s)
        setLoading(false)
    }, [db])

    const finishCharging = useCallback(
        async (id: number) => {
            const s = await finishChargingSession(db, id)
            setSession(s)
        },
        [db]
    )

    return { session, startCharging, getChargingSession, finishCharging, loading }
}
