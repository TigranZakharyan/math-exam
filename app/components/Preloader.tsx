import { useTheme } from '@rneui/themed'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Preloader = (): JSX.Element => {
    const { theme } = useTheme()
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color={theme.colors.secondary} />
        </View>
    )
}

export default Preloader
