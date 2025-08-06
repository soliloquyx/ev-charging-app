import { StyleSheet, Text, View } from 'react-native'

import { ChargerList } from './ChargerList'
import { ChargingStationInfo, Connector } from '../types'
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
            <ChargerList
                sections={sections}
                onPress={selectConnector}
                selectedId={selectedConnector?.id}
            />
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 10,
        paddingBottom: 40,
    },
})
