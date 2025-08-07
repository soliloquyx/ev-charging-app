import {
    getConnectorSummaryMap,
    toChargingSession,
    toStationInfo,
    toStationList,
} from '@data/transform'
import {
    ChargingSessionRow,
    ConnectorRowWithChargerName,
    ConnectorSummaryRow,
    StationRow,
} from '@data/types'
import { ConnectorType } from 'charging-station/types'

describe('toStationList', () => {
    it('should map station rows to ChargingStation list', () => {
        const stationRows: StationRow[] = [
            { id: 1, name: 'Station A', street: 'Street A', city: 'Tallinn', country: 'EE' },
        ]

        const connectorSummaryRows: ConnectorSummaryRow[] = [
            { station_id: 1, type: ConnectorType.TYPE2, available: 2 },
            { station_id: 1, type: ConnectorType.COMBO_CCS, available: 0 },
        ]

        const connectorMap = getConnectorSummaryMap(connectorSummaryRows)

        const result = toStationList(stationRows, connectorMap)

        expect(result).toEqual([
            {
                id: 1,
                name: 'Station A',
                address: {
                    street: 'Street A',
                    city: 'Tallinn',
                    country: 'EE',
                },
                connectors: [
                    { type: ConnectorType.TYPE2, available: 2 },
                    { type: ConnectorType.COMBO_CCS, available: 0 },
                ],
            },
        ])
    })
})

describe('toStationInfo', () => {
    it('should transform raw row to ChargingStationInfo', () => {
        const stationRow: StationRow = {
            id: 1,
            name: 'Station A',
            street: 'Street A',
            city: 'Tallinn',
            country: 'EE',
        }

        const connectorRows: ConnectorRowWithChargerName[] = [
            {
                id: 1,
                charger_id: 1,
                type: ConnectorType.CHADEMO,
                price_value: 0.5,
                price_currency: 'EUR',
                price_unit: 'kWh',
                power_unit: 'kW',
                power_value: 50,
                speed: 'Fast',
                available: true,
                charger_name: 'Charger 1',
            },
            {
                id: 2,
                charger_id: 1,
                type: ConnectorType.COMBO_CCS,
                price_value: 0.5,
                price_currency: 'EUR',
                price_unit: 'kWh',
                power_unit: 'kW',
                power_value: 50,
                speed: 'Fast',
                available: true,
                charger_name: 'Charger 1',
            },
            {
                id: 3,
                charger_id: 2,
                type: ConnectorType.COMBO_CCS,
                price_value: 0.5,
                price_currency: 'EUR',
                price_unit: 'kWh',
                power_unit: 'kW',
                power_value: 50,
                speed: 'Fast',
                available: true,
                charger_name: 'Charger 2',
            },
        ]

        const result = toStationInfo(stationRow, connectorRows)

        expect(result).toEqual({
            id: 1,
            name: 'Station A',
            address: {
                street: 'Street A',
                city: 'Tallinn',
                country: 'EE',
            },
            chargers: [
                {
                    id: 1,
                    name: 'Charger 1',
                    connectors: [
                        {
                            id: 1,
                            chargerId: 1,
                            type: ConnectorType.CHADEMO,
                            price: {
                                value: 0.5,
                                currency: 'EUR',
                                unit: 'kWh',
                            },
                            power: {
                                value: 50,
                                unit: 'kW',
                            },
                            speed: 'Fast',
                            available: true,
                        },
                        {
                            id: 2,
                            chargerId: 1,
                            type: ConnectorType.COMBO_CCS,
                            price: {
                                value: 0.5,
                                currency: 'EUR',
                                unit: 'kWh',
                            },
                            power: {
                                value: 50,
                                unit: 'kW',
                            },
                            speed: 'Fast',
                            available: true,
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Charger 2',
                    connectors: [
                        {
                            id: 3,
                            chargerId: 2,
                            type: ConnectorType.COMBO_CCS,
                            price: {
                                value: 0.5,
                                currency: 'EUR',
                                unit: 'kWh',
                            },
                            power: {
                                value: 50,
                                unit: 'kW',
                            },
                            speed: 'Fast',
                            available: true,
                        },
                    ],
                },
            ],
        })
    })
})

describe('toChargingSession', () => {
    it('should map charging session row to ChargingSession', () => {
        const sessionRow: ChargingSessionRow = {
            id: 1,
            station_id: 1,
            charger_id: 1,
            connector_id: 1,
            is_active: 1,
            connector_type: ConnectorType.CHADEMO,
            charger_name: 'Charger 1',
            battery_soc: 50,
        }

        const result = toChargingSession(sessionRow)

        expect(result).toEqual({
            id: 1,
            stationId: 1,
            chargerId: 1,
            connectorId: 1,
            isActive: true,
            connectorType: ConnectorType.CHADEMO,
            chargerName: 'Charger 1',
            batterySoc: 50,
        })
    })
})
