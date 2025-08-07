import { ChargingSession, ChargingStationInfo, Connector } from 'charging-station/types'
import { ChargingSessionView } from './ChargingSessionView'
import { ChargerList } from './ChargerList'

type Props = {
    station?: ChargingStationInfo
    session: ChargingSession | null
    setSelectedConnector: React.Dispatch<React.SetStateAction<Connector | undefined>>
    selectedConnector?: Connector
}

export const ChargingStationContent = ({
    station,
    session,
    setSelectedConnector,
    selectedConnector,
}: Props) => {
    if (session?.isActive) {
        return <ChargingSessionView session={session} />
    } else if (station) {
        const sections = station
            ? station.chargers.map((charger) => ({
                  title: charger.name,
                  data: charger.connectors.filter((c) => c.available),
              }))
            : []

        return (
            <ChargerList
                sections={sections}
                onPress={setSelectedConnector}
                selectedId={selectedConnector?.id}
            />
        )
    }
}
