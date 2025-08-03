import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { ChargingStationListItem } from './ChargingStationListItem'
import type { ChargingStation, ConnectorType } from '../types'

type Props = {
    data: ChargingStation[]
    onPress: (id: number) => void
    selectedId?: number
}

export const ChargingStationsList = ({ data, onPress, selectedId }: Props) => {
    const renderItem: ListRenderItem<ChargingStation> = ({ item }) => (
        <ChargingStationListItem item={item} onPress={onPress} selected={selectedId === item.id} />
    )

    const keyExtractor = (item: ChargingStation) => item.id.toString()

    const itemSeparator = () => <View style={styles.separator} />

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={itemSeparator}
            contentContainerStyle={styles.content}
        ></FlatList>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    content: {
        paddingHorizontal: 20,
    },
})
