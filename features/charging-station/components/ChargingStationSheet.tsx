import React, { forwardRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { colors } from '../../../theme'

type Props = {
    // your custom props
}

export const ChargingStationSheet = forwardRef<BottomSheetModal | null>(({}: Props, ref) => {
    return (
        <>
            <BottomSheetModal ref={ref} snapPoints={['60%']} index={0}>
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
})

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: '#eee',
    },
})
