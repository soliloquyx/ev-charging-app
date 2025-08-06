import { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

import type { ChargingStationInfo } from '../types'
import { getStationInfo } from '../../../db/stationInfo'

export const useChargingStationInfo = (id?: number) => {
    const db = useSQLiteContext()

    const [stationInfo, setStationsInfo] = useState<ChargingStationInfo>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        ;(async () => {
            setLoading(true)
            const data = await getStationInfo(db, id)
            setStationsInfo(data)
            setLoading(false)
        })()
    }, [db, id])

    return { stationInfo, loading }
}
