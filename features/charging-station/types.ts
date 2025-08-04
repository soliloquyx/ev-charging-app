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

type ConnectorSpeed = 'Fast' | 'Normal' | 'Slow'

export enum ConnectorType {
    CHADEMO = 'CHAdeMO',
    COMBO_CCS = 'ComboCCS',
    TYPE2 = 'Type2',
}

export type ConnectorSummary = {
    type: ConnectorType
    powerKw: number
    speed: ConnectorSpeed
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
    power: Power
    price: Price
    speed: ConnectorSpeed
    available: boolean
    isOperational: boolean
}

export type ChargingSession = {
    stationId: number
    connectorId: number
    battery: Battery
    power: Power
    isActive: boolean
}

export type ChargerSection = {
    title: string
    data: Connector[]
}
