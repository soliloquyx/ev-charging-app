import { StyleSheet, View } from 'react-native'
import { colors } from '../../constants/colors'

export const ChargingStationsScreen = () => {
    return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
