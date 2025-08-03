import { StatusBar } from 'expo-status-bar'
import { ChargingStationsScreen } from './features/charging-station/ChargingStationsScreen'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
    const [fontsLoaded] = useFonts({
        UniNeueLight: require('./assets/fonts/UniNeueLight.otf'),
        UniNeueBook: require('./assets/fonts/UniNeueBook.otf'),
        UniNeueBold: require('./assets/fonts/UniNeueBold.otf'),
        UniNeueHeavy: require('./assets/fonts/UniNeueHeavy.otf'),
    })

    if (!fontsLoaded) return null

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <SafeAreaProvider>
                    <StatusBar style="auto" />
                    <ChargingStationsScreen />
                </SafeAreaProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
