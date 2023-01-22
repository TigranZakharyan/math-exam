import React from 'react'
import { createTheme, ThemeProvider } from '@rneui/themed'
import { Provider } from 'react-redux'
import { store } from '@features'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootNavigator } from '@navigations'

const App  = (): JSX.Element => {
	const theme = createTheme({
		lightColors: {
			secondary: '#3e34b3',
			black: '#000000',
		},
		darkColors: {
			secondary: '#3e34b3',
			black: '#000000',
		},
	})
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<SafeAreaProvider>
					<RootNavigator />
				</SafeAreaProvider>
			</ThemeProvider>
		</Provider>
	)
}

export default App
