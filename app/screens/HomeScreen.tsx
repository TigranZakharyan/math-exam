import { Container, Header } from '@components'
import { Quiz } from '@features'
import { fetchQuizes, selectQuizes } from '@features/reducers/quizesSlice'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import { Theme } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { Text, View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'

const HomeScreen = (): JSX.Element => {
	const { theme } = useTheme()
	const navigation = useNavigation()
	const dispatch = useAppDispatch()
	const styles = makeStyles(theme)
	const { data } = useAppSelector(selectQuizes)

	const ARTICLE_ICON_SIZE = 50
	const NAV_ICON_SIZE = 38
	const ARTICLE_ICON_COLOR = theme.colors.secondary
	const NAV_ICON_COLOR = theme.colors.white

	const goToQuiz = (e: Quiz) => {
		navigation.navigate("QuizScreen" as never, e as never)
	}

	React.useEffect(() => {
		dispatch(fetchQuizes())
	}, [])

	return (
		<SafeAreaView>
			<ScrollView>
				<ImageBackground source={require('@assets/readyForQuiz.jpg')} resizeMode="cover">
					<View style={styles.header}>
						<Header exitColor={theme.colors.white} menuColor={theme.colors.white} />
					</View>
				</ImageBackground>
				<Container>
					<View style={styles.article}>
						<View style={styles.articleItem}>
							<Icon
								name="question-circle"
								color={ARTICLE_ICON_COLOR}
								size={ARTICLE_ICON_SIZE}
								style={styles.articleImage}
							/>
							<Text style={styles.articleText}>+ 200</Text>
							<Text style={styles.articleText}>Questions</Text>
						</View>
						<View style={styles.articleItem}>
							<Icon
								name="book"
								color={ARTICLE_ICON_COLOR}
								size={ARTICLE_ICON_SIZE}
								style={styles.articleImage}
							/>
							<Text style={styles.articleText}>+ 100</Text>
							<Text style={styles.articleText}>Books</Text>
						</View>
						<View style={styles.articleItem}>
							<Icon
								name="play"
								color={ARTICLE_ICON_COLOR}
								size={ARTICLE_ICON_SIZE}
								style={styles.articleImage}
							/>
							<Text style={styles.articleText}>+ 50</Text>
							<Text style={styles.articleText}>Videos</Text>
						</View>
					</View>
					<View style={styles.nav}>
						{
							data.map((e: Quiz) => (
								<TouchableOpacity key={e.id} onPress={() => goToQuiz(e)}>
									<View style={styles.navItem}>
										<Text style={styles.navText}>{e.title}</Text>
										<Icon name="arrow-circle-right" size={NAV_ICON_SIZE} color={NAV_ICON_COLOR} />
									</View>
								</TouchableOpacity>
							))
						}
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		header: {
			height: 300,
		},
		article: {
			marginTop: 46,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		articleItem: {
			height: 120,
			flex: 1,
			marginHorizontal: 2,
			alignItems: 'center',
			borderRadius: 20,
			backgroundColor: theme.colors.greyOutline,
		},
		articleImage: {
			top: -25,
		},
		articleText: {
			textAlign: 'center',
			fontWeight: '800',
			fontSize: 19,
			lineHeight: 20,
		},
		nav: {
			marginTop: 46,
		},
		navItem: {
			height: 85,
			borderRadius: 20,
			backgroundColor: theme.colors.primary,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 24,
			marginBottom: 35,
		},
		navText: {
			fontSize: 22,
			color: theme.colors.white,
			fontWeight: '800',
			textTransform: 'uppercase',
		},
	})

export default HomeScreen
