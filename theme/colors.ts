const brand = '#34B233'
const primary = '#FFFFFF'

export const colors = {
    background: primary,
    separator: '#CCCCCC',
    text: '#000000',
    border: {
        base: '#999999',
        selected: brand,
    },
    icon: {
        onBadge: primary,
    },
    status: {
        available: brand,
        unavailable: '#9E9E9E',
        notOperational: '#D32F2F',
    },
} as const
