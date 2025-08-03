import { StatusBar } from 'expo-status-bar'
import { ChargingStationsScreen } from './features/charging-station/ChargingStationsScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'

export default function App() {
    const [fontsLoaded] = useFonts({
        UniNeueLight: require('./assets/fonts/UniNeueLight.otf'),
        UniNeueBook: require('./assets/fonts/UniNeueBook.otf'),
        UniNeueBold: require('./assets/fonts/UniNeueBold.otf'),
        UniNeueHeavy: require('./assets/fonts/UniNeueHeavy.otf'),
    })

    if (!fontsLoaded) return null

    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <ChargingStationsScreen />
        </SafeAreaProvider>
    )
}
