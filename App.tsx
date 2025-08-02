import { StatusBar } from 'expo-status-bar'
import { ChargingStationsScreen } from './features/charging-station/ChargingStationsScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <ChargingStationsScreen />
        </SafeAreaProvider>
    )
}
