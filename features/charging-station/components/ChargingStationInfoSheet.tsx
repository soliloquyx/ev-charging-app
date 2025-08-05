import React, { forwardRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { colors, typography } from '../../../theme'
import { ChargingButton } from './ChargingButton'
import type { Props as ChargingButtonProps } from './ChargingButton'
import { ChargingStationInfo, Connector } from '../types'
import { ChargerList } from './ChargerList'
import { font } from '../../../theme/typography'

type Props = {
    station?: ChargingStationInfo
}

export const ChargingStationInfoSheet = forwardRef<BottomSheetModal | null, Props>(
    ({ station }, ref) => {
        const [isCharging, setIsCharging] = useState<boolean>(false)
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

        const getChargingButtonProps = (
            isCharging: boolean,
            selected?: Connector
        ): ChargingButtonProps => {
            if (!selected) {
                return {
                    primaryLabel: 'Select connector',
                    color: colors.button.disabled,
                    disabled: true,
                }
            } else if (isCharging) {
                return {
                    primaryLabel: 'Finish charging',
                    color: colors.button.secondary,
                    disabled: false,
                }
            } else {
                const { price } = selected
                return {
                    primaryLabel: 'Start charging',
                    secondaryLabel: `${price.value} ${price.currency}/${price.unit}`,
                    color: colors.button.primary,
                    disabled: false,
                }
            }
        }

        return (
            <BottomSheetModal
                ref={ref}
                snapPoints={['60%']}
                enableOverDrag={false}
                index={1}
                style={styles.container}
                onDismiss={onDismissSheet}
            >
                {station && (
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
                            <ChargingButton
                                {...getChargingButtonProps(isCharging, selectedConnector)}
                            />
                        </View>
                    </>
                )}
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
