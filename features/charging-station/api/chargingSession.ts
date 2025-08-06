import { ChargingSession, NewChargingSession } from '../types'
import { API_URL } from './config'

export const startSession = async (stationId: number, chargerId: number, connectorId: number) => {
    const session: NewChargingSession = {
        stationId,
        chargerId,
        connectorId,
        isActive: true,
    }

    const res = await fetch(`${API_URL}/chargingSessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
    })

    if (!res.ok) {
        throw new Error(`Failed to start charging session: ${res.status} ${res.statusText}`)
    }
}

export const fetchSession = async (): Promise<ChargingSession> => {
    const res = await fetch(
        `${API_URL}/chargingSessions?_sort=id&_order=desc&_limit=1&_expand=station&_expand=charger&_expand=connector`
    )

    if (!res.ok) {
        throw new Error(`Failed to fetch charging session: ${res.status} ${res.statusText}`)
    }

    const data: ChargingSession[] = await res.json()

    if (!Array.isArray(data) || !data.length) {
        throw new Error('No charging session found')
    }

    return data[0]
}

export const finishSession = async () => {
    const res = await fetch(`${API_URL}/chargingSessions?_sort=id&_order=desc&_limit=1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false }),
    })

    if (!res.ok) {
        throw new Error(`Failed to finish charging session: ${res.status} ${res.statusText}`)
    }
}
