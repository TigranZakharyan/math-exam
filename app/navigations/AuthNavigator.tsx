import React from 'react'
import { fetchMe, selectUser } from '@features'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, SignupScreen } from '@screens'
import { AuthStackParamList } from './types'
import { Preloader } from '@components'

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation()
    const { logedIn } = useAppSelector(selectUser)


	React.useEffect(() => {
		dispatch(fetchMe())
		.unwrap()
		.then(() => navigation.navigate("BottomTabNavigator" as never))
	}, [])
	
	if ( logedIn === null ) return <Preloader />

	return (
		<Stack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="SignupScreen" component={SignupScreen} />
		</Stack.Navigator>
	)
}

export default AuthNavigator
