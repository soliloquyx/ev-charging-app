import React, { forwardRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, typography } from '../../../theme'
import { ChargingButton } from './ChargingButton'
import { ChargingSession, ChargingStationInfo, Connector } from '../types'
import { ChargerList } from './ChargerList'
import { font } from '../../../theme/typography'
import { ChargerHeader } from './ChargerHeader'

type Props = {
    station?: ChargingStationInfo
    session: ChargingSession | null
}

export const ChargingStationInfoSheet = forwardRef<BottomSheetModal | null, Props>(
    ({ station, session }, ref) => {
        const [selectedConnector, setSelectedConnector] = useState<Connector>()

        const selectConnector = (item: Connector) => {
            setSelectedConnector(item)
        }

        const onDismissSheet = () => {
            setSelectedConnector(undefined)
        }

        const sections = station
            ? station.chargers.map((charger) => ({
                  title: charger.name,
                  data: charger.connectors.filter((c) => c.available),
              }))
            : []

        const renderSheetContent = (session: ChargingSession | null) => {
            if (session?.isActive) {
                return (
                    <BottomSheetView>
                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <Text style={styles.title}>{session.station.name}</Text>
                            <Text style={styles.address}>
                                {session.station.address.street}, {session.station.address.city},{' '}
                                {session.station.address.country}
                            </Text>
                        </View>
                        <ChargerHeader
                            name={session.charger.name}
                            connectorType={session.connector.type}
                        />
                        <Text style={{ fontFamily: font.bold, fontSize: typography.h1 }}>
                            Battery charging
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 50,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="battery-charging-50"
                                size={50}
                                color={colors.icon.primary}
                            />
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 40 }}>
                            <ChargingButton
                                primaryLabel="Finish charging"
                                color={colors.button.secondary}
                            />
                        </View>
                    </BottomSheetView>
                )
            } else if (station) {
                return (
                    <>
                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <Text style={styles.title}>{station.name}</Text>
                            <Text style={styles.address}>
                                {station.address.street}, {station.address.city},{' '}
                                {station.address.country}
                            </Text>
                        </View>
                        <ChargerList
                            sections={sections}
                            onPress={selectConnector}
                            selectedId={selectedConnector?.id}
                        />
                        <View style={{ paddingTop: 10, paddingBottom: 40 }}>
                            {selectedConnector ? (
                                <ChargingButton
                                    primaryLabel="Start charging"
                                    secondaryLabel={`${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`}
                                    color={colors.button.secondary}
                                />
                            ) : (
                                <ChargingButton
                                    primaryLabel="Select connector"
                                    color={colors.button.secondary}
                                />
                            )}
                        </View>
                    </>
                )
            }
        }

        return (
            <BottomSheetModal
                ref={ref}
                snapPoints={['60%']}
                enableOverDrag={false}
                index={0}
                style={styles.container}
                onDismiss={onDismissSheet}
            >
                <BottomSheetView>{renderSheetContent(session)}</BottomSheetView>
            </BottomSheetModal>
        )
    }
)

ChargingStationInfoSheet.displayName = 'ChargingStationInfoSheet'

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
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontFamily: font.bold,
        fontSize: typography.h1,
    },
    item: {
        fontFamily: font.regular,
        fontSize: 16,
    },

    address: {
        fontFamily: font.regular,
        fontSize: 16,
    },
    itemContainer: {
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.border.base,
        borderRadius: 8,
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
})
