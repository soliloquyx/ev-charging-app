import { useCallback, useState } from 'react'
import type { ChargingSession } from '../types'

import * as Api from '../api/chargingSession'

export const useChargingSession = () => {
    const [session, setSession] = useState<ChargingSession | undefined>()

    const startCharging = async (stationId: number, chargerId: number, connectorId: number) => {
        await Api.startSession(stationId, chargerId, connectorId)
        await getChargingSession()
    }

    const getChargingSession = useCallback(async () => {
        const s = await Api.fetchSession()
        setSession(s)
    }, [])

    const finishCharging = useCallback(async () => {
        await Api.finishSession()
        await getChargingSession()
    }, [getChargingSession])

    return { session, startCharging, getChargingSession, finishCharging }
}
