import { Container, Header } from '@components'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'

const QuestionsScreen = (): JSX.Element => {
	const { theme } = useTheme()
	const ICON_SIZE = 38
	const ICON_COLOR = 'purple'
	const ICON_DOWN = 'angle-down'

	return (
		<SafeAreaView>
			<ScrollView>
				<ImageBackground source={require('@assets/questionsBg.png')} resizeMode="cover">
					<View style={styles.header}>
						<Header exitColor={theme.colors.secondary} menuColor={theme.colors.secondary} />
						<Text style={styles.headerTitle}>essey questions</Text>
					</View>
				</ImageBackground>
				<Container>
					<View style={styles.dropbox}>
						<Text style={styles.dropboxText}>what is programming ?</Text>
						<Icon name={ICON_DOWN} size={ICON_SIZE} color={ICON_COLOR} />
					</View>
					<View style={styles.dropbox}>
						<Text style={styles.dropboxText}>what programming language is ?</Text>
						<Icon name={ICON_DOWN} size={ICON_SIZE} color={ICON_COLOR} />
					</View>
					<View style={styles.dropbox}>
						<Text style={styles.dropboxText}>what are the 4 types of programming ?</Text>
						<Icon name={ICON_DOWN} size={ICON_SIZE} color={ICON_COLOR} />
					</View>
					<View style={styles.dropbox}>
						<Text style={styles.dropboxText}>what are 3 concepts of programming ?</Text>
						<Icon name={ICON_DOWN} size={ICON_SIZE} color={ICON_COLOR} />
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 300,
	},
	headerTitle: {
		fontSize: 32,
		textAlign: 'center',
		fontWeight: '800',
		textTransform: 'uppercase',
		marginTop: 50,
	},
	dropbox: {
		marginVertical: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	dropboxText: {
		fontSize: 22,
		fontWeight: '800',
		flexBasis: '80%',
		textTransform: 'capitalize',
	},
})

export default QuestionsScreen
