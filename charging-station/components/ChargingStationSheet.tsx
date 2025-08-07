import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { BottomSheetFooter, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types'

import { useChargingSession } from 'charging-station/hooks/useChargingSession'
import { Connector } from 'charging-station/types'
import { useChargingStationInfo } from 'charging-station/hooks/useChargingStationInfo'
import { colors, font, typography } from 'theme'
import { ChargingStationFooter } from './ChargingStationFooter'
import { ChargingStationContent } from './ChargingStationContent'

type Props = {
    ref: React.RefObject<BottomSheetModal | null>
    selectedStationId?: number
    setSelectedConnector: React.Dispatch<React.SetStateAction<Connector | undefined>>
    selectedConnector?: Connector
    chargingSession: ReturnType<typeof useChargingSession>
    onDismiss: () => void
}

export const ChargingStationSheet = ({
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

    const renderFooter = (footerProps: BottomSheetDefaultFooterProps) => (
        <BottomSheetFooter {...footerProps} style={styles.footer}>
            <ChargingStationFooter
                cs={chargingSession}
                station={stationInfo}
                selectedConnector={selectedConnector}
            />
        </BottomSheetFooter>
    )

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

                        <ChargingStationContent
                            station={stationInfo}
                            session={chargingSession.session}
                            setSelectedConnector={setSelectedConnector}
                            selectedConnector={selectedConnector}
                        />
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
