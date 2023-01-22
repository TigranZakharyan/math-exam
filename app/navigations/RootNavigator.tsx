import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./types"
import { default as AuthNavigator } from "./AuthNavigator"
import { default as BottomNavigator } from "./BottomNavigator"
import { useAppSelector } from '@hooks'
import { selectUser } from '@features'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    const { logedIn } = useAppSelector(selectUser)
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="AuthNavigator"
                screenOptions={{
                    headerShown: false,
                }}>
                { 
                    logedIn ? (
                        <Stack.Screen name="BottomTabNavigator" component={BottomNavigator} />
                    ) : (
                        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator
