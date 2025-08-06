import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
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
    setSelectConnector: React.Dispatch<React.SetStateAction<Connector | undefined>>
    selectedConnector?: Connector
}

export const ChargingStationInfoSheet = ({
    ref,
    selectedStationId,
    setSelectConnector,
    selectedConnector,
}: Props) => {
    const {
        session,
        startCharging,
        getChargingSession,
        finishCharging,
        loading: sessionLoading,
    } = useChargingSession()
    const { stationInfo, loading: infoLoading } = useChargingStationInfo(
        session?.isActive ? session.stationId : selectedStationId
    )

    const isInitialLoading = !session && !stationInfo && (sessionLoading || infoLoading)

    const onDismissSheet = () => {
        setSelectConnector(undefined)
    }

    const renderSheetContent = (session: ChargingSession | null) => {
        if (session?.isActive) {
            return (
                <ChargingSessionView
                    session={session}
                    onPress={() => finishCharging(session.id!)}
                />
            )
        } else if (stationInfo) {
            return (
                <ChargingStationInfoView
                    station={stationInfo}
                    selectConnector={setSelectConnector}
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
            btnProps.onPress = () => finishCharging(session.id!)
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
            enablePanDownToClose={!session?.isActive}
            enableDismissOnClose={!session?.isActive}
            index={1}
            style={styles.container}
            onDismiss={onDismissSheet}
            footerComponent={renderFooter}
            onChange={getChargingSession}
        >
            <BottomSheetView>
                {isInitialLoading ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '60%' }}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{stationInfo?.name}</Text>
                            <Text style={styles.address}>
                                {stationInfo?.address.street}, {stationInfo?.address.city},{' '}
                                {stationInfo?.address.country}
                            </Text>
                        </View>

                        {renderSheetContent(session)}
                    </>
                )}
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
