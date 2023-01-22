import { logOutThunk } from '@features'
import { useAppDispatch } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Container from './Container'

type Props = {
  menuColor: string;
  exitColor: string;
}

const Header = ({ menuColor, exitColor }: Props): JSX.Element => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation()
	const ICON_SIZE = 48

	const logOut = () => {
		dispatch(logOutThunk())
		.unwrap()
		.then(() => navigation.navigate('AuthNavigator' as never))
	}

	return (
		<Container>
			<View style={styles.box}>
				<TouchableOpacity>
					<Icon name="md-menu-outline" color={menuColor} size={ICON_SIZE} />
				</TouchableOpacity>
				<TouchableOpacity onPress={logOut}>
					<Icon name="exit" color={exitColor} size={ICON_SIZE} />
				</TouchableOpacity>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	box: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 24
	},
})

export default Header
