import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import { ListRenderItem, SectionListData, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ChargerSection, Connector } from '../types'
import { colors } from '../../../theme'
import { font } from '../../../theme/typography'
import { ChargerListItem } from './ChargerListItem'
import { ChargerHeader } from './ChargerHeader'

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

    const renderSectionHeader = ({
        section: { title },
    }: {
        section: SectionListData<Connector, ChargerSection>
    }) => <ChargerHeader name={title} />

    const renderSectionFooter = ({
        section,
    }: {
        section: SectionListData<Connector, ChargerSection>
    }) =>
        section.data.length === 0 ? (
            <Text style={styles.placeholder}>No available connectors</Text>
        ) : null

    return (
        <BottomSheetSectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={renderSectionFooter}
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
    placeholder: {
        fontFamily: font.regular,
    },
})
