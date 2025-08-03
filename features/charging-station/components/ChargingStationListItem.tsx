import { StyleSheet, Text, View } from 'react-native'

import * as ChargingStation from '../types'
import { colors, typography } from '../../../theme/index'
import { ConnectorSummarySection } from './ConnectorSummarySection'

type Props = {
    item: ChargingStation.ListItem
}

export const ChargingStationListItem = ({ item }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.address}>
                {item.address.street}, {item.address.city}, {item.address.country}
            </Text>

            <View style={styles.separator} />

            <ConnectorSummarySection connectors={item.connections} />
        </View>
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
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
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
})
