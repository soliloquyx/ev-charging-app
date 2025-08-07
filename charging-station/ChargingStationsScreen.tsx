import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRef, useState } from 'react'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ChargingStationList } from './components/ChargingStationList'
import { useChargingStations } from './hooks/useChargingStations'
import { ChargingStationInfoSheet } from './components/ChargingStationInfoSheet'
import { Connector } from './types'
import { colors } from 'theme'
import { useChargingSession } from '@hooks/useChargingSession'

export const ChargingStationsScreen = () => {
    const [selectedId, setSelectedId] = useState<number | undefined>()
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
            <ChargingStationList
                data={stations}
                onPress={onPressListItem}
                selectedId={selectedId}
            />
            <ChargingStationInfoSheet
                ref={sheetRef}
                selectedStationId={selectedId}
                setSelectConnector={setSelectedConnector}
                selectedConnector={selectedConnector}
                chargingSession={chargingSession}
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
