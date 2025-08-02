import { StyleSheet, View } from 'react-native'
import { colors } from '../../theme/colors'
import { ChargingStationsList } from './components/ChargingStationsList'
import { SafeAreaView } from 'react-native-safe-area-context'

export const ChargingStationsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ChargingStationsList />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
})
