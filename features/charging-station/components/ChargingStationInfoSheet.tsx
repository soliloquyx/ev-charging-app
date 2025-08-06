import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheetFooter, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import { ChargingSession, Connector } from '../types'
import { ChargingSessionView } from './ChargingSessionView'
import { ChargingStationInfoView } from './ChargingStationInfoView'
import { useChargingSession } from '../hooks/useChargingSession'
import { useChargingStationInfo } from '../hooks/useChargingStationInfo'
import { ChargingButton, Props as ChargingButtonProps } from './ChargingButton'
import { colors } from '../../../theme'
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types'
import { font, typography } from '../../../theme/typography'

type Props = {
    ref: React.RefObject<BottomSheetModal | null>
    selectedStationId?: number
}

export const ChargingStationInfoSheet = ({ ref, selectedStationId }: Props) => {
    const [selectedConnector, setSelectedConnector] = useState<Connector>()
    const { stationInfo } = useChargingStationInfo(selectedStationId)
    const { session, startCharging, getChargingSession, finishCharging } = useChargingSession()

    useEffect(() => {
        if (session?.isActive || stationInfo) {
            ref.current?.present()
        }
    }, [ref, session?.isActive, stationInfo])

    const selectConnector = (item: Connector) => {
        setSelectedConnector(item)
    }

    const onDismissSheet = () => {
        setSelectedConnector(undefined)
    }

    const onChange = (index: number) => {
        if (index === 1) getChargingSession()
    }

    const renderSheetContent = (session?: ChargingSession) => {
        if (session?.isActive) {
            return <ChargingSessionView session={session} onPress={finishCharging} />
        } else if (stationInfo) {
            return (
                <ChargingStationInfoView
                    station={stationInfo}
                    selectConnector={selectConnector}
                    selectedConnector={selectedConnector}
                />
            )
        }
    }

    const renderFooter = (footerProps: BottomSheetDefaultFooterProps) => {
        const btnProps: ChargingButtonProps = {
            primaryLabel: 'Select connector',
            color: colors.button.disabled,
        }

        if (session?.isActive) {
            btnProps.primaryLabel = 'Finish charging'
            btnProps.color = colors.button.secondary
            btnProps.onPress = () => finishCharging()
        } else if (stationInfo) {
            btnProps.primaryLabel = 'Start charging'

            if (selectedConnector) {
                const { chargerId, id } = selectedConnector

                btnProps.color = colors.button.primary
                btnProps.secondaryLabel = `${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`
                btnProps.onPress = () => startCharging(stationInfo.id, chargerId, id)
            } else {
                btnProps.disabled = true
            }
        }

        return (
            <BottomSheetFooter {...footerProps} bottomInset={24}>
                <ChargingButton {...btnProps} />
            </BottomSheetFooter>
        )
    }

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['60%']}
            enableOverDrag={false}
            index={1}
            style={styles.container}
            onDismiss={onDismissSheet}
            footerComponent={renderFooter}
            onChange={onChange}
        >
            <BottomSheetView>
                <View style={styles.titleContainer}>
                    {/* <Text style={styles.title}>{session.station.name}</Text>
                    <Text style={styles.address}>
                        {session.station.address.street}, {session.station.address.city},{' '}
                        {session.station.address.country}
                    </Text> */}
                </View>
                {renderSheetContent(session)}
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 16,
        },
        paddingHorizontal: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        fontFamily: font.bold,
        fontSize: typography.h1,
    },
    address: {
        fontFamily: font.regular,
        fontSize: 16,
    },
})
