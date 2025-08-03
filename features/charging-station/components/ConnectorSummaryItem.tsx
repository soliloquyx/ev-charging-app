import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ConnectorSummary } from '../types'
import { connectionIcon } from '../utils/icon'
import { colors } from '../../../theme'

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
                <View>
                    <View style={styles.powerContainer}>
                        <MaterialCommunityIcons name="lightning-bolt" size={18} color="#FFFF00" />
                        <Text style={styles.power}>
                            {item.speed} ({item.powerKw}kW)
                        </Text>
                    </View>
                </View>
            </View>
            <Text style={[styles.status, statusColor(item.available, item.isOperational)]}>
                Available ({item.available})
            </Text>
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
        marginTop: 10,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        backgroundColor: 'black',
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
        fontFamily: 'UniNeueRegular',
        fontSize: 14,
    },
    powerContainer: {
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    power: {
        fontFamily: 'UniNeueHeavy',
        color: 'white',
        fontSize: 12,
    },
    status: {
        fontFamily: 'UniNeueHeavy',
        fontSize: 14,
    },
})
