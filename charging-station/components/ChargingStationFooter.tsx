import { ChargingButton, Props as ChargingButtonProps } from './ChargingButton'
import { colors } from 'theme'
import { ChargingStationInfo, Connector } from 'charging-station/types'
import { useChargingSession } from '@hooks/useChargingSession'

type Props = {
    cs: ReturnType<typeof useChargingSession>
    station?: ChargingStationInfo
    selectedConnector?: Connector
}

export const ChargingStationFooter = ({ cs, station, selectedConnector }: Props) => {
    const btnProps: ChargingButtonProps = {
        primaryLabel: 'Select connector',
        color: colors.button.disabled,
    }

    if (cs.session?.isActive) {
        btnProps.primaryLabel = 'Finish charging'
        btnProps.color = colors.button.secondary
        btnProps.onPress = () => cs.finishCharging(cs.session!.id!, cs.session!.connectorId)
    } else if (station) {
        btnProps.primaryLabel = 'Start charging'

        if (selectedConnector) {
            const { chargerId, id } = selectedConnector

            btnProps.color = colors.button.primary
            btnProps.secondaryLabel = `${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`
            btnProps.onPress = () => cs.startCharging(station.id, chargerId, id)
        } else {
            btnProps.disabled = true
        }
    }

    return <ChargingButton {...btnProps} />
}
