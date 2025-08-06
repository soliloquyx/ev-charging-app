import { ConnectorSpeed, ConnectorType } from 'charging-station/types'

export type ConnectorSummaryRow = {
    station_id: number
    type: ConnectorType
    identifier?: string
    available: number
}

export type StationRow = {
    id: number
    name: string
    street: string
    city: string
    country: string
}

export type ConnectorRow = {
    id: number
    charger_id: number
    type: ConnectorType
    identifier?: string
    price_value: number
    price_currency: string
    price_unit: string
    power_unit: string
    power_value: number
    speed: ConnectorSpeed
    available: boolean
}

export type ChargingSessionRow = {
    id: number
    station_id: number
    charger_id: number
    connector_id: number
    is_active: number
    connector_type: ConnectorType
    charger_name: string
}

export type ConnectorRowWithChargerName = ConnectorRow & { charger_name: string }
