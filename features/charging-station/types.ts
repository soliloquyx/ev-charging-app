type Address = {
    street: string
    city: string
    country: string
}

export enum ConnectorType {
    CHADEMO = 'CHAdeMO',
    COMBO_CCS = 'ComboCCS',
    TYPE2 = 'Type2',
}

export type ConnectorSummary = {
    type: ConnectorType
    powerKw: number
    speed: 'Medium' | 'Fast'
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
