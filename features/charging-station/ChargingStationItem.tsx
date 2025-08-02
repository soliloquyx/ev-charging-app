import { StyleSheet, Text, View } from 'react-native'
import { ChargingStation } from './types'
import { colors } from '../../constants/colors'

type Props = {
    item: ChargingStation
}

export const ChargingStationItem = ({ item }: Props) => {
    return (
        <View style={styles.container}>
            <Text>{item.name}</Text>
            <Text>
                {item.address.street}, {item.address.city}, {item.address.country}
            </Text>
            <View style={{ height: 1, backgroundColor: '#CCCCCC' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
})
