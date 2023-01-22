import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Theme } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import { BooksScreen, HomeScreen, PdfReaderScreen, QuestionsScreen, QuizScreen, VideosScreen } from '@screens'
import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BooksStackParamList, BottomTabStackParamList, HomeStackParamList } from './types'

const Tab = createBottomTabNavigator<BottomTabStackParamList>()
const BooksStack = createNativeStackNavigator<BooksStackParamList>()
const HomeStack = createNativeStackNavigator<HomeStackParamList>()


const BooksNavigator = (): JSX.Element => {
	return (
		<BooksStack.Navigator
			initialRouteName="BooksScreen"
			screenOptions={{
				headerShown: false,
				
			}}>
			<BooksStack.Screen name="BooksScreen" component={BooksScreen} />
			<BooksStack.Screen name="PdfReaderScreen" component={PdfReaderScreen} />
		</BooksStack.Navigator>
	)
}

const HomeNavigator = (): JSX.Element => {
	return (
		<HomeStack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{
				headerShown: false,
				
			}}>
			<HomeStack.Screen name="HomeScreen" component={HomeScreen} />
			<HomeStack.Screen name="QuizScreen" component={QuizScreen} />
		</HomeStack.Navigator>
	)
}

const BottomNavigator = (): JSX.Element => {
	const { theme } = useTheme()
	const styles = makeStyles(theme)

	const ICON_SIZE = 35
	const ICON_COLOR: string = theme.colors.white

	return (
		<Tab.Navigator
			initialRouteName='HomeNavigator'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBar,
			}}>
			<Tab.Screen
				name="HomeNavigator"
				component={HomeNavigator}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Icon
							name="home"
							size={ICON_SIZE}
							color={ICON_COLOR}
							style={[styles.icon, focused ? styles.focused : null]}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="QuestionsScreen"
				component={QuestionsScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Icon
							name="question"
							size={ICON_SIZE}
							color={ICON_COLOR}
							style={[styles.icon, focused ? styles.focused : null]}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="VideosScreen"
				component={VideosScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Icon
							name="play-circle"
							size={ICON_SIZE}
							color={ICON_COLOR}
							style={[styles.icon, focused ? styles.focused : null]}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="BooksNavigator"
				component={BooksNavigator}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Icon
							name="book-reader"
							size={ICON_SIZE}
							color={ICON_COLOR}
							style={[styles.icon, focused ? styles.focused : null]}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		tabBar: {
			height: 60,
			backgroundColor: theme.colors.secondary,
		},
		icon: {
			width: '100%',
			height: '100%',
			textAlign: 'center',
			lineHeight: 60,
		},
		focused: {
			width: '100%',
			height: '100%',
			lineHeight: 60,
			backgroundColor: theme.colors.black,
		},
	})

export default BottomNavigator
