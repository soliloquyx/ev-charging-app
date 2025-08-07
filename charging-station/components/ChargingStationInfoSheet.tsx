import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { BottomSheetFooter, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types'

import { ChargingSessionView } from './ChargingSessionView'
import { ChargingButton, Props as ChargingButtonProps } from './ChargingButton'
import { ChargerList } from './ChargerList'
import { useChargingSession } from 'charging-station/hooks/useChargingSession'
import { ChargingSession, Connector } from 'charging-station/types'
import { useChargingStationInfo } from 'charging-station/hooks/useChargingStationInfo'
import { colors, font, typography } from 'theme'

type Props = {
    ref: React.RefObject<BottomSheetModal | null>
    selectedStationId?: number
    setSelectedConnector: React.Dispatch<React.SetStateAction<Connector | undefined>>
    selectedConnector?: Connector
    chargingSession: ReturnType<typeof useChargingSession>
    onDismiss: () => void
}

export const ChargingStationInfoSheet = ({
    ref,
    selectedStationId,
    setSelectedConnector,
    selectedConnector,
    chargingSession,
    onDismiss,
}: Props) => {
    const { stationInfo, loading: infoLoading } = useChargingStationInfo(
        chargingSession.session?.isActive ? chargingSession.session?.stationId : selectedStationId
    )

    const isInitialLoading =
        !chargingSession.session && !stationInfo && (chargingSession.loading || infoLoading)

    const renderSheetContent = (session: ChargingSession | null) => {
        if (session?.isActive) {
            return (
                <ChargingSessionView
                    session={session}
                    onPress={() => chargingSession.finishCharging(session.id!, session.connectorId)}
                />
            )
        } else if (stationInfo) {
            const sections = stationInfo
                ? stationInfo.chargers.map((charger) => ({
                      title: charger.name,
                      data: charger.connectors.filter((c) => c.available),
                  }))
                : []

            return (
                <ChargerList
                    sections={sections}
                    onPress={setSelectedConnector}
                    selectedId={selectedConnector?.id}
                />
            )
        }
    }

    const renderFooter = (footerProps: BottomSheetDefaultFooterProps) => {
        const btnProps: ChargingButtonProps = {
            primaryLabel: 'Select connector',
            color: colors.button.disabled,
        }

        if (chargingSession && chargingSession.session && chargingSession.session.isActive) {
            btnProps.primaryLabel = 'Finish charging'
            btnProps.color = colors.button.secondary
            btnProps.onPress = () =>
                chargingSession.finishCharging(
                    chargingSession.session!.id!,
                    chargingSession.session!.connectorId
                )
        } else if (stationInfo) {
            btnProps.primaryLabel = 'Start charging'

            if (selectedConnector) {
                const { chargerId, id } = selectedConnector

                btnProps.color = colors.button.primary
                btnProps.secondaryLabel = `${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`
                btnProps.onPress = () =>
                    chargingSession.startCharging(stationInfo.id, chargerId, id)
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

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['60%']}
            enableOverDrag={false}
            enablePanDownToClose={!chargingSession.session?.isActive}
            enableDismissOnClose={!chargingSession.session?.isActive}
            index={1}
            style={styles.container}
            onDismiss={onDismiss}
            footerComponent={renderFooter}
            onChange={chargingSession.getChargingSession}
        >
            <BottomSheetView>
                {isInitialLoading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{stationInfo?.name}</Text>
                            <Text style={styles.address}>
                                {stationInfo?.address.street}, {stationInfo?.address.city},{' '}
                                {stationInfo?.address.country}
                            </Text>
                        </View>

                        {renderSheetContent(chargingSession.session)}
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
        fontSize: typography.body2,
    },
    footer: {
        backgroundColor: colors.background,
        paddingTop: 10,
        paddingBottom: 25,
    },
})
