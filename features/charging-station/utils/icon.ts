import * as ChargingStation from '../types'

export const connectionIcon = (c: ChargingStation.ConnectionType) => {
    switch (c) {
        case ChargingStation.ConnectionType.CHADEMO:
            return 'ev-plug-chademo'
        case ChargingStation.ConnectionType.COMBO_CCS:
            return 'ev-plug-ccs2'
        case ChargingStation.ConnectionType.TYPE2:
            return 'ev-plug-type2'
        default:
            return 'power-plug-outline'
    }
}
