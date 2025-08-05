import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ConnectorSummary } from '../types'
import { connectionIcon } from '../utils/icon'
import { colors } from '../../../theme'
import { font } from '../../../theme/typography'

type Props = {
    item: ConnectorSummary
}

const statusColor = (available: number, isOperational: boolean): { color: string } => {
    let color: string = colors.status.available

    if (!isOperational) {
        color = colors.status.notOperational
    } else if (available === 0) {
        color = colors.status.unavailable
    }

    return { color }
}

const statusText = (available: number, total: number, isOperational: boolean) => {
    let text = `Available (${available}/${total})`

    if (!isOperational) {
        text = 'Out of Service'
    }

    return text
}
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
                <Text style={[styles.status, statusColor(item.available, item.isOperational)]}>
                    {statusText(item.available, item.total, item.isOperational)}
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
