import React from 'react'
import { View } from 'react-native'

type Props = {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: Props): JSX.Element => {
	return <View style={{ marginHorizontal: 18 }}>{children}</View>
}

export default Container
