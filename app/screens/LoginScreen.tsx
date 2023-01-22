import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Container, TextInput, ErrorAlert } from '@components'
import { useNavigation } from '@react-navigation/native'
import { Text, Theme } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import { hexToRgba, constants } from '@utils'
import { loginThunk } from '@features'
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAlert, useAppDispatch } from '@hooks'
import type { Login } from '@features/types'

const initialData: Login = {
	email: '',
	password: '',
}

const LoginScreen = () : JSX.Element => {
	const navigation = useNavigation()
	const dispatch = useAppDispatch()
	const { theme } = useTheme()
	const error = useAlert()
	const styles = makeStyles(theme)
	const [data, setData] = React.useState<Login>(initialData)

	const handleChange = (name: string, value: string) => {
		setData({ ...data, [name]: value })
	}

	const handleSend = () => {
		dispatch(loginThunk(data))
		.unwrap()
		.then(() => navigation.navigate("BottomTabNavigator" as never))
		.catch(() => error.setAlert(constants.INCORRECT_LOGIN))
	}

	const goToSignup = () => {
		setData(initialData)
		navigation.navigate('SignupScreen' as never)
	}
	return (
		<SafeAreaView>
			<ImageBackground 
				source={require('@assets/loginBg.png')} 
				style={{height: '100%'}}
			>
				<ScrollView>
					<ErrorAlert {...error} />
					<View style={styles.box}>
						<Container>
							<View style={styles.header}>
								<Image source={require('@assets/loginLogo.png')} />
								<Text h1 style={styles.headerTitle}>Login</Text>
							</View>
							<View style={styles.inputBox}>
								<View style={styles.inputAside}>
									<Icon name="email" size={30} color={theme.colors.white} />
								</View>
								<TextInput
									name="email"
									value={data.email}
									style={styles.input}
									onChangeText={handleChange}
									placeholder="Email address"
									placeholderTextColor={theme.colors.secondary}
								/>
							</View>
							<View style={styles.inputBox}>
								<View style={styles.inputAside}>
									<Icon name="lock" size={30} color={theme.colors.white} />
								</View>
								<TextInput
									name="password"
									secureTextEntry
									style={styles.input}
									placeholder="Password"
									onChangeText={handleChange}
									placeholderTextColor={theme.colors.secondary}
								/>
							</View>
							<TouchableOpacity style={styles.btn} onPress={handleSend}>
								<Text style={styles.login}>Log in</Text>
								<Icon
									name="arrow-right"
									size={30}
									color={theme.colors.white}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={styles.forgotPassword}>Forget password?</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={goToSignup}
								style={styles.footer}>
								<View>
									<Text style={styles.footerTitle}>Create New</Text>
									<Text style={styles.footerTitle}>Account</Text>
								</View>
								<Icon name="arrow-right-circle" size={60} color={theme.colors.secondary} />
							</TouchableOpacity>
						</Container>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		box: {
			height: '100%',
			paddingVertical: 10,
		},
		header: {
			marginTop: 80,
			alignItems: 'center',
		},
		headerTitle: {
			marginTop: 47,
			fontSize: 35,
			textShadowColor: hexToRgba(theme.colors.primary, 0.4),
			textShadowOffset: { width: 0, height: 3 },
			textShadowRadius: 5,
		},
		inputBox: {
			width: '100%',
			height: 50,
			borderRadius: 12,
			marginTop: 48,
			elevation: 10,
			backgroundColor: theme.colors.white,
			flexDirection: 'row',
			overflow: 'hidden',
		},
		inputAside: {
			width: 70,
			height: '100%',
			backgroundColor: theme.colors.secondary,
			justifyContent: 'center',
			alignItems: 'center',
		},
		input: {
			flexGrow: 2,
			paddingHorizontal: 20,
			fontSize: 18,
			color: theme.colors.secondary,
		},
		btn: {
			height: 50,
			backgroundColor: hexToRgba(theme.colors.secondary, 0.7),
			borderRadius: 12,
			marginTop: 48,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		login: {
			color: theme.colors.white,
			fontSize: 22,
			fontWeight: '800',
		},
		forgotPassword: {
			textAlign: 'center',
			marginVertical: 42,
			fontSize: 22,
			fontWeight: '800',
		},
		footer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		footerTitle: {
			fontSize: 28,
			fontWeight: '800',
			color: theme.colors.secondary,
		},
	})

export default LoginScreen
