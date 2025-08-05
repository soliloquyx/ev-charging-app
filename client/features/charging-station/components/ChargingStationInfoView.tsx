import { StyleSheet, Text, View } from 'react-native'
import { ChargerList } from './ChargerList'
import { ChargingStationInfo, Connector } from '../types'
import { ChargingButton } from './ChargingButton'
import { colors } from '../../../theme'
import { font, typography } from '../../../theme/typography'

type Props = {
    station: ChargingStationInfo
    selectConnector: (item: Connector) => void
    selectedConnector?: Connector
}

export const ChargingStationInfoView = ({ station, selectConnector, selectedConnector }: Props) => {
    const sections = station
        ? station.chargers.map((charger) => ({
              title: charger.name,
              data: charger.connectors.filter((c) => c.available),
          }))
        : []

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{station.name}</Text>
                <Text style={styles.address}>
                    {station.address.street}, {station.address.city}, {station.address.country}
                </Text>
            </View>
            <ChargerList
                sections={sections}
                onPress={selectConnector}
                selectedId={selectedConnector?.id}
            />
            <View style={styles.buttonContainer}>
                {selectedConnector ? (
                    <ChargingButton
                        primaryLabel="Start charging"
                        secondaryLabel={`${selectedConnector.price.value} ${selectedConnector.price.currency}/${selectedConnector.price.unit}`}
                        color={colors.button.secondary}
                    />
                ) : (
                    <ChargingButton
                        primaryLabel="Select connector"
                        color={colors.button.secondary}
                    />
                )}
            </View>
        </>
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
        fontSize: 16,
    },
    buttonContainer: {
        paddingTop: 10,
        paddingBottom: 40,
    },
})
