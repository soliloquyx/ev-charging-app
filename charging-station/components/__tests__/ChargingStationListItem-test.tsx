import { render, fireEvent } from '@testing-library/react-native'

import { ChargingStationListItem } from '@components/ChargingStationListItem'
import type { ChargingStation } from 'charging-station/types'
import { colors } from 'theme'

const mockStation: ChargingStation = {
    id: 1,
    name: 'Test Station',
    address: {
        street: 'Rävala pst 5',
        city: 'Tallinn',
        country: 'EE',
    },
    connectors: [],
}

describe('ChargingStationListItem', () => {
    it('renders station name and address', () => {
        const { getByText } = render(
            <ChargingStationListItem item={mockStation} selected={false} onPress={() => {}} />
        )

        expect(getByText('Test Station')).toBeTruthy()
        expect(getByText('Rävala pst 5, Tallinn, EE')).toBeTruthy()
    })

    it('calls onPress with station id when pressed', () => {
        const onPressMock = jest.fn()

        const { getByRole } = render(
            <ChargingStationListItem item={mockStation} selected={false} onPress={onPressMock} />
        )

        fireEvent.press(getByRole('button'))

        expect(onPressMock).toHaveBeenCalledWith(1)
    })

    it('applies selected style when selected=true', () => {
        const { getByRole } = render(
            <ChargingStationListItem item={mockStation} selected={true} onPress={() => {}} />
        )

        const pressable = getByRole('button')

        expect(pressable.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ borderColor: colors.border.selected }),
            ])
        )
    })
})
