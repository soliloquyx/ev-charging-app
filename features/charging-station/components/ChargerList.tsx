import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ChargerSection, Connector } from '../types'
import { colors } from '../../../theme'
import { font } from '../../../theme/typography'

type Props = {
    sections: ChargerSection[]
    onPress: (item: Connector) => void
    selectedId?: number
}

export const ChargerList = ({ sections, onPress, selectedId }: Props) => {
    const renderItem: ListRenderItem<Connector> = ({ item }) => {
        if (!item.available) return null

        return (
            <Pressable
                style={[styles.itemContainer, selectedId === item.id && styles.selected]}
                onPress={() => onPress(item)}
            >
                <Text style={styles.item}>{item.type}</Text>
                {item.identifier && <Text style={styles.item}>{item.identifier}</Text>}
            </Pressable>
        )
    }

    return (
        <BottomSheetSectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <>
                    <View style={styles.sectionTitleContainer}>
                        <MaterialCommunityIcons
                            name="ev-station"
                            style={styles.titleIcon}
                            size={20}
                            color={colors.icon.primary}
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.separator} />
                </>
            )}
            renderSectionFooter={({ section }) =>
                section.data.length === 0 ? (
                    <Text style={styles.item}>No available connectors</Text>
                ) : null
            }
        ></BottomSheetSectionList>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: font.bold,
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: colors.border.base,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    item: {
        fontFamily: font.regular,
        fontSize: 16,
    },
    selected: {
        borderColor: colors.border.selected,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
    },
    titleIcon: {
        marginEnd: 4,
    },
    separator: {
        height: 1,
        backgroundColor: colors.separator,
        marginVertical: 8,
    },
})
