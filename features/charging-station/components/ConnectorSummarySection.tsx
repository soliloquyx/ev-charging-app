import { StyleSheet, Text, View } from 'react-native'

import { ConnectorSummaryItem } from './ConnectorSummaryItem'
import { ConnectorSummary } from '../types'

type Props = {
    connectors: ConnectorSummary[]
}

export const ConnectorSummarySection = ({ connectors }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connectors</Text>
            {connectors.map((c) => (
                <ConnectorSummaryItem item={c} key={c.type} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'UniNeueHeavy',
        fontSize: 16,
    },
})
