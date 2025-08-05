import { ConnectorSpeed, ConnectorType } from './types'

export type Address = {
    street: string
    city: string
    country: string
}

export type Power = {
    value: number
    unit: string
}

export type Price = {
    value: number
    currency: string
    unit: string
}

export type Station = {
    id: number
    name: string
    address: Address
    connectors: ConnectorSummary[]
}

export type Charger = {
    id: number
    stationId: number
    name: string
    connectors: Connector[]
}

export type Connector = {
    id: number
    chargerId: number
    type: ConnectorType
    identifier?: string
    power: Power
    price: Price
    speed: ConnectorSpeed
    available: boolean
    isOperational: boolean
}

export type StationInfo = {
    id: number
    name: string
    address: {
        street: string
        city: string
        country: string
    }
    chargers: Charger[]
}

export type ConnectorSummary = {
    type: ConnectorType
    available: number
    total: number
    isOperational: boolean
}

export type NewChargingSession = {
    stationId: number
    chargerId: number
    connectorId: number
    isActive: boolean
}

export type ChargingSession = {
    id: number
    station: {
        name: string
        address: Address
    }
    charger: {
        id: number
        name: string
    }
    connector: {
        id: number
        type: ConnectorType
    }
    isActive: boolean
}
