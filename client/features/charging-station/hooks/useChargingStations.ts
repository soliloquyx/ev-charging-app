import { useEffect, useState } from 'react'

import { ChargingStation } from '../types'

export const useChargingStations = () => {
    const [stations, setStations] = useState<ChargingStation[]>([])

    const fetchStations = async (): Promise<ChargingStation[]> => {
        const res = await fetch('http://localhost:3000/chargingStations')

        if (!res.ok) {
            throw new Error('Failed to fetch charging stations')
        }

        return res.json()
    }

    useEffect(() => {
        ;(async () => {
            const data = await fetchStations()
            setStations(data)
        })()
    }, [])

    return { stations }
}
