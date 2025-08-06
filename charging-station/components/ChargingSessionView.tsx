import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ChargerHeader } from './ChargerHeader'
import { ChargingSession } from '../types'
import { colors, typography, font } from 'theme'

type Props = {
    session: ChargingSession
    onPress: () => Promise<void>
}

export const ChargingSessionView = ({ session, onPress }: Props) => {
    return (
        <View>
            <ChargerHeader name={session.chargerName} connectorType={session.connectorType} />
            <Text style={styles.charging}>Battery charging</Text>
            <View style={styles.batteryIcon}>
                <MaterialCommunityIcons
                    name="battery-charging-50"
                    size={50}
                    color={colors.icon.primary}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    charging: {
        fontFamily: font.bold,
        fontSize: typography.h1,
    },
    batteryIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
})
