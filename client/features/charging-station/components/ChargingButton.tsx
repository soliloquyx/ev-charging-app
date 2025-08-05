import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

import { colors } from '../../../theme'
import { font } from '../../../theme/typography'

export type Props = {
    primaryLabel: string
    secondaryLabel?: string
    disabled?: boolean
    color: string
}

const opacityStyle = (pressed: boolean) => ({ opacity: pressed ? 0.5 : 1 })

export const ChargingButton = ({
    primaryLabel,
    secondaryLabel,
    disabled = false,
    color,
}: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: color },
                opacityStyle(pressed),
            ]}
            disabled={disabled}
        >
            <Text style={styles.primaryLabel}>{primaryLabel}</Text>
            {secondaryLabel ? <Text style={styles.secondaryLabel}>{secondaryLabel}</Text> : null}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.button.primary,
        padding: 15,
        alignItems: 'center',
        borderRadius: 50,
    },
    primaryLabel: {
        color: colors.button.text,
        fontFamily: font.regular,
        fontSize: 18,
    },
    secondaryLabel: {
        color: colors.button.text,
        fontFamily: font.regular,
        fontSize: 14,
    },
})
