const brand = '#00973A'
const primary = '#FFFFFF'
const secondary = '#2B2E36'

export const colors = {
    background: primary,
    separator: '#E2DED9',
    text: {
        primary: secondary,
        secondary: primary,
    },
    border: {
        base: '#E2DED9',
        selected: brand,
    },
    icon: {
        primary: secondary,
        onBadge: primary,
    },
    status: {
        available: brand,
        unavailable: '#9E9E9E',
        notOperational: '#A45755',
    },
    button: {
        primary: brand,
        secondary,
        disabled: '#CCCCCC',
        text: primary,
    },
    badge: {
        primary: secondary,
        secondary: brand,
    },
} as const
