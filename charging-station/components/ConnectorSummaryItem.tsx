import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ConnectorSummary, ConnectorType } from 'charging-station/types'
import { colors, font, typography } from 'theme'

type Props = {
    item: ConnectorSummary
}

export const ConnectorSummaryItem = ({ item }: Props) => {
    const statusColor = (available: number): { color: string } =>
        available ? { color: colors.status.available } : { color: colors.status.unavailable }

    const connectionIcon = (c: ConnectorType) => {
        switch (c) {
            case ConnectorType.CHADEMO:
                return 'ev-plug-chademo'
            case ConnectorType.COMBO_CCS:
                return 'ev-plug-ccs2'
            case ConnectorType.TYPE2:
                return 'ev-plug-type2'
            default:
                return 'power-plug-outline'
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer} key={item.type}>
                <View style={styles.typeContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name={connectionIcon(item.type)}
                            size={20}
                            color={colors.icon.onBadge}
                        />
                    </View>
                    <Text style={styles.type}>{item.type}</Text>
                </View>
                <Text
                    testID={`status-text-${item.type}`}
                    style={[styles.status, statusColor(item.available)]}
                >
                    {`Available (${item.available})`}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        backgroundColor: colors.badge.primary,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginEnd: 8,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    type: {
        fontFamily: font.regular,
        fontSize: typography.body3,
    },
    status: {
        fontFamily: font.bold,
        fontSize: typography.h2,
    },
})
