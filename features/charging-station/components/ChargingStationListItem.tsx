import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import * as ChargingStation from '../types'
import { colors, typography } from '../../../theme/index'
import { connectionIcon } from '../utils/icon'

type Props = {
    item: ChargingStation.ListItem
}

export const ChargingStationListItem = ({ item }: Props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text>
                    {item.address.street}, {item.address.city}, {item.address.country}
                </Text>
                <View style={styles.separator} />
                {item.connections.map((c) => (
                    <View style={styles.connection} key={c.type}>
                        <MaterialCommunityIcons
                            name={connectionIcon(c.type)}
                            size={24}
                            color="black"
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border.inactive,
        borderRadius: 8,
        paddingHorizontal: 30,
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'row',
    },
    separator: {
        height: 1,
        backgroundColor: colors.separator,
    },
    title: {
        fontFamily: 'UniNeueBold',
        fontSize: typography.h2,
    },
    connection: {
        flex: 1,
        flexDirection: 'row',
    },
})
