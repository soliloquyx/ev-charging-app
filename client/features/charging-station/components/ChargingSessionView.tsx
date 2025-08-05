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
}

export const ChargingSessionView = ({ session }: Props) => {
    return (
        <BottomSheetView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{session.station.name}</Text>
                <Text style={styles.address}>
                    {session.station.address.street}, {session.station.address.city},{' '}
                    {session.station.address.country}
                </Text>
            </View>
            <ChargerHeader name={session.charger.name} connectorType={session.connector.type} />
            <Text style={styles.charging}>Battery charging</Text>
            <View style={styles.batteryIcon}>
                <MaterialCommunityIcons
                    name="battery-charging-50"
                    size={50}
                    color={colors.icon.primary}
                />
            </View>
            <View style={styles.buttonContainer}>
                <ChargingButton primaryLabel="Finish charging" color={colors.button.secondary} />
            </View>
        </BottomSheetView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        fontFamily: font.bold,
        fontSize: typography.h1,
    },
    address: {
        fontFamily: font.regular,
        fontSize: typography.h2,
    },
    charging: {
        fontFamily: font.bold,
        fontSize: typography.h1,
    },
    batteryIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
    buttonContainer: {
        paddingTop: 10,
        paddingBottom: 40,
    },
})
