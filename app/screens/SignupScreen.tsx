import { Container, ErrorAlert, TextInput } from '@components'
import { useNavigation } from '@react-navigation/native'
import { Theme } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import type { Registration } from '@features/types'
import { useAppDispatch, useAlert } from '@hooks'
import { regThunk } from '@features'
import { constants } from '@utils'

const initialData = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
}

const SignupScreen = (): JSX.Element => {
	const { theme } = useTheme()
	const navigation = useNavigation()
	const dispatch = useAppDispatch()
	const styles = makeStyles(theme)
	const error = useAlert()
	const [data, setData] = React.useState<Registration>(initialData)

	const handleChange = (name: string, value: string) => {
		setData({ ...data, [name]: value })
	}

	const handleSend = async () => {
		dispatch(regThunk(data))
		.unwrap()
		.then(() => navigation.navigate('LoginScreen' as never))
		.catch(() => error.setAlert(constants.INCORRECT_REG))
	}

	const goToLogin = () => {
		setData(initialData)
		navigation.navigate('LoginScreen' as never)
	}

	return (
		<SafeAreaView>
			<ImageBackground 
				source={require('@assets/signupBg.png')}
				style={{height: '100%'}}
			>
				<ScrollView>
					<ErrorAlert {...error}/>
					<View style={styles.box}>
						<Container>
							<Text style={styles.title}>Create</Text>
							<Text style={styles.title}>Account</Text>
							<View style={styles.form}>
								<View style={styles.inputBox}>
									<Icon name="email" color={theme.colors.black} size={30} />
									<TextInput
										name="email"
										onChangeText={handleChange}
										value={data?.email}
										placeholder="Email"
										style={styles.input}
										keyboardType="email-address"
										placeholderTextColor={theme.colors.secondary}
									/>
									<View style={styles.inputBoxAfter} />
								</View>
								<View style={styles.inputBox}>
									<Icon name="account" color={theme.colors.black} size={30} />
									<TextInput
										name="firstName"
										placeholder="FirstName"
										onChangeText={handleChange}
										value={data?.firstName}
										style={styles.input}
										maxLength={16}
										placeholderTextColor={theme.colors.secondary}
									/>
									<View style={styles.inputBoxAfter} />
								</View>
								<View style={styles.inputBox}>
									<Icon name="pen" color={theme.colors.black} size={30} />
									<TextInput
										name="lastName"
										placeholder="LastName"
										onChangeText={handleChange}
										value={data?.lastName}
										style={styles.input}
										maxLength={16}
										placeholderTextColor={theme.colors.secondary}
									/>
									<View style={styles.inputBoxAfter} />
								</View>
								<View style={styles.inputBox}>
									<Icon name="lock" color={theme.colors.black} size={30} />
									<TextInput
										name="password"
										placeholder="Password"
										onChangeText={handleChange}
										value={data?.password}
										secureTextEntry
										style={styles.input}
										maxLength={16}
										placeholderTextColor={theme.colors.secondary}
									/>
									<View style={styles.inputBoxAfter} />
								</View>
							</View>
							<TouchableOpacity style={styles.btn} onPress={handleSend}>
								<Text style={styles.signup}>Sign Up</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={goToLogin}>
								<Text style={styles.footerTitle}>Already Have Account</Text>
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
		title: {
			fontSize: 50,
			fontWeight: '800',
		},
		form: {
			marginTop: 50,
		},
		inputBox: {
			flexDirection: 'row',
			borderBottomWidth: 3,
			borderColor: theme.colors.secondary,
			paddingVertical: 12,
			marginTop: 24,
		},
		inputBoxAfter: {
			position: 'absolute',
			bottom: -11.5,
			right: 0,
			borderRightWidth: 15,
			borderRightColor: theme.colors.secondary,
			borderTopWidth: 10,
			borderTopColor: 'transparent',
			borderBottomWidth: 10,
			borderBottomColor: 'transparent',
		},
		input: {
			flex: 1,
			marginLeft: 24,
			fontSize: 24,
			color: theme.colors.secondary,
			fontWeight: '800',
		},
		btn: {
			height: 80,
			backgroundColor: theme.colors.secondary,
			borderRadius: 12,
			marginTop: 48,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		signup: {
			fontSize: 32,
			fontWeight: '800',
			color: theme.colors.white,
		},
		footerTitle: {
			color: theme.colors.secondary,
			fontWeight: '800',
			fontSize: 23,
			textAlign: 'center',
			marginTop: 40,
			textDecorationLine: 'underline',
		},
	})

export default SignupScreen
