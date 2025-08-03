import { FlatList, ListRenderItem } from 'react-native'
import { ChargingStationListItem } from './ChargingStationListItem'
import * as ChargingStation from '../types'

type Props = {
    onPress: (id: number) => void
    selectedId?: number
}

export const ChargingStationsList = ({ onPress, selectedId }: Props) => {
    const data: ChargingStation.ListItem[] = [
        {
            id: 1,
            name: 'Tallinn Rävala pst 5 parkla',
            address: {
                street: 'Rävala pst 5',
                city: 'Tallinn',
                country: 'Estonia',
            },
            connections: [
                {
                    type: ChargingStation.ConnectorType.CHADEMO,
                    powerKw: 50,
                    speed: 'Fast',
                    available: 1,
                    total: 1,
                    isOperational: true,
                },
                {
                    type: ChargingStation.ConnectorType.COMBO_CCS,
                    powerKw: 50,
                    speed: 'Fast',
                    available: 1,
                    total: 1,
                    isOperational: true,
                },
            ],
        },
    ]

    const renderItem: ListRenderItem<ChargingStation.ListItem> = ({ item }) => (
        <ChargingStationListItem item={item} onPress={onPress} selected={selectedId === item.id} />
    )

    const keyExtractor = (item: ChargingStation.ListItem) => item.id.toString()

    return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
}
