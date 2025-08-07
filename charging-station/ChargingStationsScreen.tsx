import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRef, useState } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ChargingStationList } from './components/ChargingStationList'
import { useChargingStations } from './hooks/useChargingStations'
import { ChargingStationSheet } from './components/ChargingStationSheet'
import { Connector } from './types'
import { colors } from 'theme'
import { useChargingSession } from '@hooks/useChargingSession'

export const ChargingStationsScreen = () => {
    const [selectedStationId, setSelectedStationId] = useState<number | undefined>()
    const { stations, updateStationList } = useChargingStations()
    const chargingSession = useChargingSession({
        updateStationList,
    })
    const [selectedConnector, setSelectedConnector] = useState<Connector>()

    const sheetRef = useRef<BottomSheetModal>(null)

    const onPressListItem = (newId: number) => {
        if (!chargingSession.loading && chargingSession.session?.isActive) {
            return
        }

        setSelectedStationId((currentId) => {
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

    const onDismissSheet = () => {
        setSelectedConnector(undefined)
        setSelectedStationId(undefined)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChargingStationList
                data={stations}
                onPress={onPressListItem}
                selectedId={selectedStationId}
            />
            <ChargingStationSheet
                ref={sheetRef}
                selectedStationId={selectedStationId}
                setSelectedConnector={setSelectedConnector}
                selectedConnector={selectedConnector}
                chargingSession={chargingSession}
                onDismiss={onDismissSheet}
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
