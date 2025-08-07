import { render } from '@testing-library/react-native'

import { ConnectorSummary, ConnectorType } from 'charging-station/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ConnectorSummaryItem } from '@components/ConnectorSummaryItem'
import { colors } from 'theme'

jest.mock('@expo/vector-icons', () => ({
    MaterialCommunityIcons: jest.fn(() => null),
}))

afterEach(() => {
    jest.clearAllMocks()
})

describe('ConnectorSummaryItem', () => {
    it('renders connector type and availability', () => {
        const item: ConnectorSummary = {
            type: ConnectorType.COMBO_CCS,
            available: 2,
        }

        const { getByText } = render(<ConnectorSummaryItem item={item} />)

        expect(getByText('ComboCCS')).toBeTruthy()
        expect(getByText('Available (2)')).toBeTruthy()
    })

    it('renders available color text when available count > 0', () => {
        const item: ConnectorSummary = {
            type: ConnectorType.TYPE2,
            available: 2,
        }

        const { getByTestId } = render(<ConnectorSummaryItem item={item} />)

        const statusText = getByTestId('status-text-Type2')
        expect(statusText.props.style[1].color).toBe(colors.status.available)
    })

    it('renders unavailable color text when available count === 0', () => {
        const item: ConnectorSummary = {
            type: ConnectorType.TYPE2,
            available: 0,
        }

        const { getByTestId } = render(<ConnectorSummaryItem item={item} />)

        const statusText = getByTestId('status-text-Type2')
        expect(statusText.props.style[1].color).toBe(colors.status.unavailable)
    })

    it('passes Type2 name to MaterialCommunityIcons', () => {
        const item: ConnectorSummary = {
            type: ConnectorType.TYPE2,
            available: 2,
        }

        render(<ConnectorSummaryItem item={item} />)

        expect(MaterialCommunityIcons).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'ev-plug-type2' }),
            undefined
        )
    })

    it('passes CHAdeMO name to MaterialCommunityIcons', () => {
        const item: ConnectorSummary = {
            type: ConnectorType.CHADEMO,
            available: 2,
        }

        render(<ConnectorSummaryItem item={item} />)

        expect(MaterialCommunityIcons).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'ev-plug-chademo' }),
            undefined
        )
    })

    it('passes ComboCCS name to MaterialCommunityIcons', () => {
        const item: ConnectorSummary = {
            type: ConnectorType.COMBO_CCS,
            available: 2,
        }

        render(<ConnectorSummaryItem item={item} />)

        expect(MaterialCommunityIcons).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'ev-plug-ccs2' }),
            undefined
        )
    })
})
