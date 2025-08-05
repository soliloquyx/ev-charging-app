import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import { ListRenderItem, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ChargerSection, Connector } from '../types'
import { colors } from '../../../theme'
import { font } from '../../../theme/typography'
import { ChargerListItem } from './ChargerListItem'

type Props = {
    sections: ChargerSection[]
    onPress: (item: Connector) => void
    selectedId?: number
}

export const ChargerList = ({ sections, onPress, selectedId }: Props) => {
    const renderItem: ListRenderItem<Connector> = ({ item }) => {
        if (!item.available) return null

        return <ChargerListItem item={item} selectedId={selectedId} onPress={onPress} />
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
