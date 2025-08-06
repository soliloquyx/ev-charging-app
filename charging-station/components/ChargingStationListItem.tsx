import { Pressable, StyleSheet, Text, View } from 'react-native'

import { ConnectorSummarySection } from './ConnectorSummarySection'
import type { ChargingStation } from 'charging-station/types'
import { colors, typography, font } from 'theme'

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
        height: 1,
        backgroundColor: colors.separator,
        marginVertical: 10,
        width: '100%',
    },
    title: {
        fontFamily: font.bold,
        fontSize: typography.h1,
        marginBottom: 4,
    },
    address: {
        fontFamily: font.regular,
        fontSize: 16,
    },
    selected: {
        borderColor: colors.border.selected,
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
})
