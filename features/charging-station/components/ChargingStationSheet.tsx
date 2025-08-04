import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'
import {
    BottomSheetFooter,
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetSectionList,
    BottomSheetView,
} from '@gorhom/bottom-sheet'
import { colors, typography } from '../../../theme'
import { ChargingButton } from './ChargingButton'
import { Charger, ChargingSession, ChargingStationInfo, Connector, ConnectorType } from '../types'
import { ChargerList } from './ChargerList'
import { font } from '../../../theme/typography'

type Props = {
    // your custom props
}

// {
//     "id": 1,
//     "name": "Tallinna Torupilli Selver",
//     "address": {
//         "street": "Vesivärava 37",
//         "city": "Tallinn",
//         "country": "Estonia"
//     },
//     "connectors": [
//         {
//             "type": "CHAdeMO",
//             "powerKw": 50,
//             "speed": "Fast",
//             "available": 1,
//             "isOperational": false
//         },
//         {
//             "type": "ComboCCS",
//             "powerKw": 50,
//             "speed": "Fast",
//             "available": 1,
//             "isOperational": true
//         }
//     ]
// },

export const ChargingStationSheet = forwardRef<BottomSheetModal | null>(({}: Props, ref) => {
    const [isCharging, setIsCharging] = useState<boolean>(false)
    const [selectedConnector, setSelectedConnector] = useState<Connector>()

    const selectConnector = (item: Connector) => {
        setSelectedConnector(item)
    }

    const station: ChargingStationInfo = {
        id: 1,
        name: 'Tallinna Torupilli Selver',
        address: {
            street: 'Vesivärava 37',
            city: 'Tallinn',
            country: 'Estonia',
        },
        chargers: [
            {
                id: 1,
                name: 'CH10080',
                connectors: [
                    {
                        id: 1,
                        type: ConnectorType.CHADEMO,
                        power: {
                            value: 50,
                            unit: 'kW',
                        },
                        price: {
                            value: 0.42,
                            currency: 'EUR',
                            unit: 'kWh',
                        },
                        speed: 'Fast',
                        available: true,
                        isOperational: false,
                    },
                    {
                        id: 2,
                        type: ConnectorType.COMBO_CCS,
                        power: {
                            value: 50,
                            unit: 'kW',
                        },
                        price: {
                            value: 0.42,
                            currency: 'EUR',
                            unit: 'kWh',
                        },
                        speed: 'Fast',
                        available: true,
                        isOperational: true,
                    },
                ],
            },
        ],
    }

    const sections = station.chargers.map((charger) => ({
        title: charger.name,
        data: charger.connectors,
    }))

    const renderFooter = useCallback(
        (props) => (
            <BottomSheetFooter {...props} bottomInset={24}>
                <View
                    style={{
                        paddingVertical: 20,
                    }}
                >
                    <ChargingButton
                        primaryLabel={isCharging ? 'Finish charging' : 'Start charging'}
                        secondaryLabel={
                            !isCharging && !!selectedConnector
                                ? `Price: ${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`
                                : undefined
                        }
                        color={isCharging ? colors.button.secondary : colors.button.primary}
                        disabled={!!selectedConnector}
                    />
                </View>
            </BottomSheetFooter>
        ),
        []
    )

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['60%']}
            index={1}
            style={styles.container}
            footerComponent={renderFooter}
        >
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>{station.name}</Text>
                <Text style={styles.address}>
                    {station.address.street}, {station.address.city}, {station.address.country}
                </Text>
            </View>
            <ChargerList sections={sections} onPress={selectConnector} />
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 16 },
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontFamily: font.bold,
        fontSize: typography.h2,
    },
    item: {
        fontFamily: font.regular,
        fontSize: 16,
    },

    address: {
        fontFamily: font.thin,
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
