import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, font } from 'theme'
import { Connector } from 'charging-station/types'

type Props = {
    item: Connector
    selectedId?: number
    onPress: (item: Connector) => void
}

export const ChargerListItem = ({ item, selectedId, onPress }: Props) => {
    return (
        <Pressable
            style={[styles.container, selectedId === item.id && styles.selected]}
            onPress={() => onPress(item)}
        >
            <View style={styles.typeContainer}>
                {item.identifier && (
                    <Text style={[styles.item, styles.itemIdentifier]}>{item.identifier}</Text>
                )}
                <Text style={styles.item}>{item.type}</Text>
            </View>

            <View style={styles.powerContainer}>
                <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={18}
                    color={colors.icon.onBadge}
                />
                <Text style={styles.power}>
                    {item.power.value}
                    {item.power.unit}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border.base,
        backgroundColor: colors.background,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    item: {
        fontFamily: font.regular,
        fontSize: 16,
    },
    itemIdentifier: {
        marginEnd: 4,
    },
    selected: {
        borderColor: colors.border.selected,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    typeContainer: {
        flexDirection: 'row',
    },
    powerContainer: {
        flexDirection: 'row',
        backgroundColor: colors.badge.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    power: {
        fontFamily: font.bold,
        color: colors.text.secondary,
        fontSize: 12,
    },
})
