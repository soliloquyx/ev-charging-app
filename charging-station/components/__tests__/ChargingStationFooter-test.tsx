import { render } from '@testing-library/react-native'

import { ChargingStationFooter } from '@components/ChargingStationFooter'
import { useChargingSession } from '@hooks/useChargingSession'
import { ChargingStationInfo, Connector } from 'charging-station/types'
import { colors } from 'theme'

describe('ChargingStationFooter', () => {
    it('disables button if connector not selected', () => {
        const mockCs = {} as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = undefined

        const { getByTestId } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        const btn = getByTestId('charging-button')
        expect(btn.props.accessibilityState?.disabled).toBe(true)
    })

    it('enables button if connector selected', () => {
        const mockCs = { session: { isActive: true } } as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = { id: 1 } as Connector

        const { getByTestId } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        const btn = getByTestId('charging-button')
        expect(btn.props.accessibilityState?.disabled).toBe(false)
    })

    it("render 'Finish charging' when session is active", () => {
        const mockCs = { session: { isActive: true } } as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = { id: 1 } as Connector

        const { getByText } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        expect(getByText('Finish charging')).toBeTruthy()
    })

    it("renders 'Start charging' when connector is selected and session is not active", () => {
        const mockCs = { session: { isActive: true } } as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = { id: 1 } as Connector

        const { getByText } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        expect(getByText('Finish charging')).toBeTruthy()
    })

    it('renders price as secondary label when connector is selected and session is not active', () => {
        const mockCs = {} as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = {
            id: 1,
            price: {
                currency: 'EUR',
                value: 0.4,
                unit: 'kWh',
            },
        } as Connector

        const expectedLabel = `${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`

        const { getByText } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        expect(getByText(expectedLabel)).toBeTruthy()
    })

    it('applies primary button color when connector is selected and session is not active', () => {
        const mockCs = { session: { isActive: true } } as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = { id: 1 } as Connector

        const { getByTestId } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        const btn = getByTestId('charging-button')
        const flatStyle = Object.assign({}, ...btn.props.style)

        expect(flatStyle.backgroundColor).toBe(colors.button.secondary)
    })

    it('applies secondary button color when session is active', () => {
        const mockCs = { session: { isActive: true } } as ReturnType<typeof useChargingSession>
        const station = { id: 1 } as ChargingStationInfo
        const selectedConnector = { id: 1 } as Connector

        const { getByTestId } = render(
            <ChargingStationFooter
                cs={mockCs}
                station={station}
                selectedConnector={selectedConnector}
            />
        )

        const btn = getByTestId('charging-button')
        const flatStyle = Object.assign({}, ...btn.props.style)

        expect(flatStyle.backgroundColor).toBe(colors.button.secondary)
    })
})
