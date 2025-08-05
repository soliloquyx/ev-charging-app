import { Dto } from '../../../../shared'

export const startCharging = async (stationId: number, chargerId: number, connectorId: number) => {
    const session: Dto.NewChargingSession = {
        stationId,
        chargerId,
        connectorId,
        isActive: true,
    }

    const res = await fetch('http://localhost:3000/charging-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
    })

    if (!res.ok) {
        throw new Error(`Failed to start charging session: ${res.status} ${res.statusText}`)
    }

    const savedSession: Dto.ChargingSession = await res.json()
    return savedSession
}

export const getChargingSession = async (): Promise<Dto.ChargingSession> => {
    const res = await fetch(`http://localhost:3000/charging-sessions/latest`)

    if (!res.ok) {
        throw new Error('Failed to fetch charging stations')
    }

    return res.json()
}
