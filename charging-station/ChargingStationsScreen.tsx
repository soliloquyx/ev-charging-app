import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRef, useState } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ChargingStationsList } from './components/ChargingStationsList'
import { useChargingStations } from './hooks/useChargingStations'
import { colors } from '../../theme/colors'
import { ChargingStationInfoSheet } from './components/ChargingStationInfoSheet'
import { Connector } from './types'

export const ChargingStationsScreen = () => {
    const [selectedId, setSelectedId] = useState<number | undefined>()
    const { stations } = useChargingStations()
    const [selectedConnector, setSelectedConnector] = useState<Connector>()

    const sheetRef = useRef<BottomSheetModal>(null)

    const onPressListItem = (newId: number) => {
        setSelectedId((currentId) => {
            if (currentId === newId) {
                sheetRef.current?.close()
                return undefined
            } else {
                setSelectedConnector(undefined)
                sheetRef.current?.present()
                return newId
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChargingStationsList
                data={stations}
                onPress={onPressListItem}
                selectedId={selectedId}
            />
            <ChargingStationInfoSheet
                ref={sheetRef}
                selectedStationId={selectedId}
                setSelectConnector={setSelectedConnector}
                selectedConnector={selectedConnector}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
})
