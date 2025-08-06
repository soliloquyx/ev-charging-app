import { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ChargerHeader } from './ChargerHeader'
import { ChargingSession } from '../types'
import { ChargingButton } from './ChargingButton'
import { colors, typography } from '../../../theme'
import { font } from '../../../theme/typography'

type Props = {
    session: ChargingSession
    onPress: () => Promise<void>
}

export const ChargingSessionView = ({ session, onPress }: Props) => {
    return (
        <BottomSheetView>
            <ChargerHeader name={session.charger.name} connectorType={session.connector.type} />
            <Text style={styles.charging}>Battery charging</Text>
            <View style={styles.batteryIcon}>
                <MaterialCommunityIcons
                    name="battery-charging-50"
                    size={50}
                    color={colors.icon.primary}
                />
            </View>
        </BottomSheetView>
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
