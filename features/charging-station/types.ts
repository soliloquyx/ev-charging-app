type Address = {
    street: string
    city: string
    country: string
}

export enum ConnectionType {
    CHADEMO = 'CHAdeMO',
    COMBO_CCS = 'ComboCCS',
    TYPE2 = 'Type2',
}

type ConnectionSummary = {
    type: ConnectionType
    powerKw: number
    available: number
    total: number
    isOperational: boolean
}

export type ListItem = {
    id: number
    name: string
    address: Address
    connections: ConnectionSummary[]
}
