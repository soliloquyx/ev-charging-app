import { StatusBar } from 'expo-status-bar'
import { ChargingStationsScreen } from './features/charging-station/ChargingStationsScreen'

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <ChargingStationsScreen />
        </>
    )
}
