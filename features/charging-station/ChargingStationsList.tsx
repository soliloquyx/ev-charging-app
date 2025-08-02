import { FlatList, ListRenderItem } from 'react-native'
import { ChargingStationItem } from './ChargingStationItem'
import { ChargingStation } from './types'

export const ChargingStationsList = () => {
    const data: ChargingStation[] = [
        {
            id: 1,
            name: 'Tallinn Rävala pst 5 parkla',
            address: {
                street: 'Rävala pst 5',
                city: 'Tallinn',
                country: 'Estonia',
            },
            chargers: [
                {
                    id: 1,
                    name: 'CH10060',
                    connections: [
                        {
                            id: 1,
                            type: 'CHAdeMO',
                            powerKw: 50,
                            isOperational: true,
                        },
                        {
                            id: 2,
                            type: 'ComboCSS',
                            powerKw: 50,
                            isOperational: true,
                        },
                    ],
                },
            ],
        },
    ]

    const renderItem: ListRenderItem<ChargingStation> = ({ item }) => (
        <ChargingStationItem item={item} />
    )

    const keyExtractor = (item: ChargingStation) => item.id.toString()

    return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}></FlatList>
}
