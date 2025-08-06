import { useEffect, useState } from 'react'

import { ChargingStation } from '../types'
import { getStationList } from '../../../db/stationList'
import { useSQLiteContext } from 'expo-sqlite'

export const useChargingStations = () => {
    const db = useSQLiteContext()
    const [stations, setStations] = useState<ChargingStation[]>([])

    useEffect(() => {
        if (!db) return
        ;(async () => {
            const list = await getStationList(db)
            setStations(list)
        })()
    }, [db])

    return { stations }
}
