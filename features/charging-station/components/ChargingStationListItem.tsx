import { Pressable, StyleSheet, Text, View } from 'react-native'

import type { ChargingStation } from '../types'
import { colors, typography } from '../../../theme/index'
import { ConnectorSummarySection } from './ConnectorSummarySection'

type Props = {
    item: ChargingStation
    selected: boolean
    onPress: (id: number) => void
}

export const ChargingStationListItem = ({ item, selected, onPress }: Props) => {
    return (
        <Pressable
            style={[styles.container, selected && styles.selected]}
            onPress={() => onPress(item.id)}
        >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.address}>
                {item.address.street}, {item.address.city}, {item.address.country}
            </Text>

            <View style={styles.separator} />

            <ConnectorSummarySection connectors={item.connectors} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.border.base,
        borderRadius: 8,
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    separator: {
        height: 2,
        backgroundColor: colors.border.base,
        marginVertical: 10,
        width: '100%',
    },
    title: {
        fontFamily: 'UniNeueHeavy',
        fontSize: typography.h2,
    },
    address: {
        fontFamily: 'UniNeueBook',
        fontSize: 16,
    },
    selected: {
        borderColor: colors.border.selected,
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
})
