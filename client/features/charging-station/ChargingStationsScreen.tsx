import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useRef, useState } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ChargingStationsList } from './components/ChargingStationsList'
import { useChargingStations } from './hooks/useChargingStations'
import { colors } from '../../theme/colors'
import { useChargingStationInfo } from './hooks/useChargingStationInfo'
import { ChargingStationInfoSheet } from './components/ChargingStationInfoSheet'
import { useChargingSession } from './hooks/useChargingSession'

export const ChargingStationsScreen = () => {
    const [selectedId, setSelectedId] = useState<number | undefined>()
    const { stations } = useChargingStations()
    const { stationInfo } = useChargingStationInfo(selectedId)
    const { session, startSession, fetchSession } = useChargingSession()

    const sheetRef = useRef<BottomSheetModal>(null)

    const onPressListItem = (newId: number) => {
        setSelectedId((currentId) => {
            console.log('TEST - 1', currentId === newId)
            if (currentId === newId) {
                sheetRef.current?.close()
                return undefined
            } else {
                sheetRef.current?.present()
                return newId
            }
        })
    }

    useEffect(() => {
        fetchSession()
    }, [fetchSession])

    useEffect(() => {
        if (session?.isActive || stationInfo) {
            sheetRef.current?.present()
        }
    }, [session?.isActive, stationInfo])

    return (
        <SafeAreaView style={styles.container}>
            <ChargingStationsList
                data={stations}
                onPress={onPressListItem}
                selectedId={selectedId}
            />
            <ChargingStationInfoSheet ref={sheetRef} station={stationInfo} session={session} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
})
