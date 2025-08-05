import { useEffect, useState } from 'react'

import type { ChargingStationInfo } from '../types'

export const useChargingStationInfo = (id?: number) => {
    const [stationInfo, setStationsInfo] = useState<ChargingStationInfo>()

    useEffect(() => {
        if (!id) return

        const fetchStationInfo = async (): Promise<ChargingStationInfo> => {
            const res = await fetch(`http://localhost:3000/chargingStationInfo/${id}`)

            if (!res.ok) {
                throw new Error('Failed to fetch charging stations')
            }

            return res.json()
        }

        ;(async () => {
            const data = await fetchStationInfo()
            setStationsInfo(data)
        })()
    }, [id])

    return { stationInfo }
}
