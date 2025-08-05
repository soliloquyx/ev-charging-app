import { ConnectorSpeed, ConnectorType } from '../shared'

export type DB = {
    stations: Station[]
    chargers: Charger[]
    connectors: Connector[]
}

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
}

export type Charger = {
    id: number
    stationId: number
    name: string
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
