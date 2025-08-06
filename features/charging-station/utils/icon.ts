import { ConnectorType } from '../types'

export const connectionIcon = (c: ConnectorType) => {
    switch (c) {
        case ConnectorType.CHADEMO:
            return 'ev-plug-chademo'
        case ConnectorType.COMBO_CCS:
            return 'ev-plug-ccs2'
        case ConnectorType.TYPE2:
            return 'ev-plug-type2'
        default:
            return 'power-plug-outline'
    }
}
