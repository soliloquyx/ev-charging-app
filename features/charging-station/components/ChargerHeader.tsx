import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { font } from '../../../theme/typography'
import { colors } from '../../../theme'
import { ConnectorType } from '../types'

type Props = {
    name: string
    connectorType?: ConnectorType
}

export const ChargerHeader = ({ name, connectorType }: Props) => {
    return (
        <>
            <View style={styles.nameContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="ev-station"
                        style={styles.icon}
                        size={20}
                        color={colors.icon.primary}
                    />
                    <Text style={styles.text}>{name}</Text>
                </View>
                {connectorType && <Text style={styles.text}>{connectorType}</Text>}
            </View>
            <View style={styles.separator} />
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: font.bold,
        fontSize: 16,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginEnd: 4,
    },
    separator: {
        height: 1,
        backgroundColor: colors.separator,
        marginVertical: 8,
    },
    placeholder: {
        fontFamily: font.regular,
    },
})
