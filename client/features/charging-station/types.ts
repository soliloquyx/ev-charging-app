type Address = {
    street: string
    city: string
    country: string
}

type Power = {
    value: number
    unit: string
}

type Price = {
    value: number
    currency: string
    unit: string
}

type Battery = {
    soc: number
}

export type ConnectorSpeed = 'Fast' | 'Normal' | 'Slow'

export enum ConnectorType {
    CHADEMO = 'CHAdeMO',
    COMBO_CCS = 'ComboCCS',
    TYPE2 = 'Type2',
}

export type ConnectorSummary = {
    type: ConnectorType
    available: number
    total: number
    isOperational: boolean
}

export type ChargingStation = {
    id: number
    name: string
    address: Address
    connectors: ConnectorSummary[]
}

export type ChargingStationInfo = {
    id: number
    name: string
    address: {
        street: string
        city: string
        country: string
    }
    chargers: Charger[]
}

export type Charger = {
    id: number
    name: string
    connectors: Connector[]
}

export type Connector = {
    id: number
    type: ConnectorType
    identifier?: string
    power: Power
    price: Price
    speed: ConnectorSpeed
    available: boolean
    isOperational: boolean
}

export type ChargingSession = {
    id: number
    stationId: number
    connectorId: number
    isActive: boolean
}

export type ChargerSection = {
    title: string
    data: Connector[]
}
