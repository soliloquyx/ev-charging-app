import { useCallback, useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

import { ChargingStation } from '../types'
import { getStationList } from '@data/stationList'

export const useChargingStations = () => {
    const db = useSQLiteContext()
    const [stations, setStations] = useState<ChargingStation[]>([])

    const updateStationList = useCallback(async () => {
        const list = await getStationList(db)
        setStations(list)
    }, [db])

    useEffect(() => {
        if (!db) return

        updateStationList()
    }, [db, updateStationList])

    return { stations, updateStationList }
}
