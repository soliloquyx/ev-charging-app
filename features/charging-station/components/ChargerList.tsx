import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import { ListRenderItem, Pressable, StyleSheet, Text } from 'react-native'

import { ChargerSection, Connector } from '../types'
import { typography } from '../../../theme'
import { font } from '../../../theme/typography'

type Props = {
    sections: ChargerSection[]
    onPress: (item: Connector) => void
}

export const ChargerList = ({ sections, onPress }: Props) => {
    const renderItem: ListRenderItem<Connector> = ({ item }) => (
        <Pressable style={styles.itemContainer} onPress={() => onPress(item)}>
            <Text style={styles.item}>{item.type}</Text>
        </Pressable>
    )

    return (
        <BottomSheetSectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.title}>{title}</Text>
            )}
        ></BottomSheetSectionList>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: font.bold,
        fontSize: typography.h2,
    },
    itemContainer: {},
    item: {
        fontFamily: font.regular,
        fontSize: 16,
    },
})
