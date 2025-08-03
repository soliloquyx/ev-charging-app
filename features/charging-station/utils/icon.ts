import * as ChargingStation from '../types'

export const connectionIcon = (c: ChargingStation.ConnectorType) => {
    switch (c) {
        case ChargingStation.ConnectorType.CHADEMO:
            return 'ev-plug-chademo'
        case ChargingStation.ConnectorType.COMBO_CCS:
            return 'ev-plug-ccs2'
        case ChargingStation.ConnectorType.TYPE2:
            return 'ev-plug-type2'
        default:
            return 'power-plug-outline'
    }
}
