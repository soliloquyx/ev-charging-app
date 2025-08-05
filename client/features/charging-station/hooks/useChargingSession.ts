import type { ChargingSession } from '../types'
import { startCharging, getChargingSession } from '../api/chargingSession'
import { useCallback, useState } from 'react'

export const useChargingSession = () => {
    const [session, setSession] = useState<ChargingSession | null>(null)

    const startSession = async (
        stationId: number,
        chargerId: number,
        connectorId: number
    ): Promise<ChargingSession> => {
        const s = await startCharging(stationId, chargerId, connectorId)
        setSession(s)
        return s
    }

    const fetchSession = useCallback(async (): Promise<ChargingSession | null> => {
        const s = await getChargingSession()
        console.log('TEST - 1', s)
        setSession(s)
        return s
    }, [])

    return { session, startSession, fetchSession }
}
