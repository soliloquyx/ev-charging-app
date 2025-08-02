type Address = {
    street: string
    city: string
    country: string
}

type Connection = {
    id: number
    type: string
    powerKw: number
    isOperational: boolean
}

type Charger = {
    id: number
    name: string
    connections: Connection[]
}

export type ChargingStation = {
    id: number
    name: string
    address: Address
    chargers: Charger[]
}
