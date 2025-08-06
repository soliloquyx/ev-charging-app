import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ConnectorSummary } from '../types'
import { connectionIcon } from '../utils/icon'
import { colors } from '../../../theme'
import { font } from '../../../theme/typography'

type Props = {
    item: ConnectorSummary
}

const statusColor = (available: number): { color: string } =>
    available ? { color: colors.status.available } : { color: colors.status.unavailable }

export const ConnectorSummaryItem = ({ item }: Props) => {
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
                <Text style={[styles.status, statusColor(item.available)]}>
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
        fontSize: 14,
    },
    status: {
        fontFamily: font.bold,
        fontSize: 16,
    },
})
