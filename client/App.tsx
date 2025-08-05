import { StatusBar } from 'expo-status-bar'
import { ChargingStationsScreen } from './features/charging-station/ChargingStationsScreen'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
    Inter_100Thin,
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
} from '@expo-google-fonts/inter'

export default function App() {
    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_400Regular,
        Inter_700Bold,
        Inter_900Black,
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
