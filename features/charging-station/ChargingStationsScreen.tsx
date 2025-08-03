import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCallback, useRef, useState } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ChargingStationsList } from './components/ChargingStationsList'
import { useChargingStations } from './hooks/useChargingStations'
import { ChargingStationSheet } from './components/ChargingStationSheet'
import { colors } from '../../theme/colors'

export const ChargingStationsScreen = () => {
    const [selectedId, setSelectedId] = useState<number | undefined>()
    const { stations } = useChargingStations()

    const sheetRef = useRef<BottomSheetModal>(null)

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        sheetRef.current?.present()
    }, [])
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index)
    }, [])

    const onPress = (newId: number) => {
        setSelectedId((currentId) => (currentId === newId ? undefined : newId))
        sheetRef.current?.present()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChargingStationsList data={stations} onPress={onPress} selectedId={selectedId} />
            <ChargingStationSheet ref={sheetRef} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
})
