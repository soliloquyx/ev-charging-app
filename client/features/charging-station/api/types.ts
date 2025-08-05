import { ConnectorSpeed, ConnectorType } from '../types'

type AddressDTO = {
    street: string
    city: string
    country: string
}

type PowerDTO = {
    value: number
    unit: string
}

type PriceDTO = {
    value: number
    currency: string
    unit: string
}

export type StationDTO = {
    id: number
    name: string
    address: AddressDTO
    connectors: ConnectorDTO[]
}

export type ChargerDTO = {
    id: number
    name: string
    connectors: ConnectorDTO[]
}

export type ConnectorDTO = {
    id: number
    type: ConnectorType
    identifier?: string
    power: PowerDTO
    price: PriceDTO
    speed: ConnectorSpeed
    available: boolean
    isOperational: boolean
}
