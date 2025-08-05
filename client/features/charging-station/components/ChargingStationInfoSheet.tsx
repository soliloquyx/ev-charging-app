import { forwardRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import { ChargingSession, ChargingStationInfo, Connector } from '../types'
import { ChargingSessionView } from './ChargingSessionView'
import { ChargingStationInfoView } from './ChargingStationInfoView'

type Props = {
    station?: ChargingStationInfo
    session: ChargingSession | null
}

export const ChargingStationInfoSheet = forwardRef<BottomSheetModal | null, Props>(
    ({ station, session }, ref) => {
        const [selectedConnector, setSelectedConnector] = useState<Connector>()

        const selectConnector = (item: Connector) => {
            setSelectedConnector(item)
        }

        const onDismissSheet = () => {
            setSelectedConnector(undefined)
        }

        const renderSheetContent = (session: ChargingSession | null) => {
            if (session?.isActive) {
                return <ChargingSessionView session={session} />
            } else if (station) {
                return (
                    <ChargingStationInfoView
                        station={station}
                        selectConnector={selectConnector}
                        selectedConnector={selectedConnector}
                    />
                )
            }
        }

        return (
            <BottomSheetModal
                ref={ref}
                snapPoints={['60%']}
                enableOverDrag={false}
                index={0}
                style={styles.container}
                onDismiss={onDismissSheet}
            >
                <BottomSheetView>{renderSheetContent(session)}</BottomSheetView>
            </BottomSheetModal>
        )
    }
)

ChargingStationInfoSheet.displayName = 'ChargingStationInfoSheet'

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 16,
        },
        paddingHorizontal: 20,
    },
})
