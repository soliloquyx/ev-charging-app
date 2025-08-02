import { FlatList, ListRenderItem } from 'react-native'
import { ChargingStationListItem } from './ChargingStationListItem'
import * as ChargingStation from '../types'

export const ChargingStationsList = () => {
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
                    type: ChargingStation.ConnectionType.CHADEMO,
                    powerKw: 50,
                    available: 1,
                    total: 1,
                    isOperational: true,
                },
                {
                    type: ChargingStation.ConnectionType.COMBO_CCS,
                    powerKw: 50,
                    available: 1,
                    total: 1,
                    isOperational: true,
                },
            ],
        },
    ]

    const renderItem: ListRenderItem<ChargingStation.ListItem> = ({ item }) => (
        <ChargingStationListItem item={item} />
    )

    const keyExtractor = (item: ChargingStation.ListItem) => item.id.toString()

    return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
}
