import { StyleSheet, View } from 'react-native'
import { colors } from '../../theme/colors'
import { ChargingStationsList } from './components/ChargingStationsList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

export const ChargingStationsScreen = () => {
    const [selectedId, setSelectedId] = useState<number | undefined>()

    const onPress = (newId: number) => {
        setSelectedId((currentId) => (currentId === newId ? undefined : newId))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChargingStationsList onPress={onPress} selectedId={selectedId} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
})
