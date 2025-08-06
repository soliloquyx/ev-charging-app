import { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

import type { ChargingStationInfo } from '../types'
import { getStationInfo } from '../../../db/stationInfo'

export const useChargingStationInfo = (id?: number) => {
    const db = useSQLiteContext()

    const [stationInfo, setStationsInfo] = useState<ChargingStationInfo>()

    useEffect(() => {
        if (!id) return
        ;(async () => {
            const data = await getStationInfo(db, id)
            setStationsInfo(data)
        })()
    }, [db, id])

    return { stationInfo }
}
