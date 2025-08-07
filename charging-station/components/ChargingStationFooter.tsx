import { BottomSheetFooter } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types'

import { ChargingButton, Props as ChargingButtonProps } from './ChargingButton'
import { colors } from 'theme'
import { ChargingStationInfo, Connector } from 'charging-station/types'
import { useChargingSession } from '@hooks/useChargingSession'
import { StyleSheet } from 'react-native'

type Props = {
    cs: ReturnType<typeof useChargingSession>
    station?: ChargingStationInfo
    selectedConnector?: Connector
    footerProps: BottomSheetDefaultFooterProps
}

export const ChargingStationFooter = ({ cs, station, selectedConnector, footerProps }: Props) => {
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

    return (
        <BottomSheetFooter {...footerProps} style={styles.footer}>
            <ChargingButton {...btnProps} />
        </BottomSheetFooter>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: colors.background,
        paddingTop: 10,
        paddingBottom: 25,
    },
})
