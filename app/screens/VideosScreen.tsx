import { Container } from '@components'
import { Theme } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import React from 'react'
import { View, Text, ImageBackground, ScrollView, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'

const VideosScreen = (): JSX.Element => {
	const { theme } = useTheme()
	const styles = makeStyles(theme)
  
	return (
		<SafeAreaView>
			<ScrollView>
				<ImageBackground source={require('@assets/videosBg.jpg')}>
					<Container>
						<View style={styles.header}>
							<Text style={styles.headerTitle}>more courses</Text>
						</View>
					</Container>
				</ImageBackground>
				<Container>
					<Text style={styles.contentTitle}>top watched</Text>
					<View style={styles.videoItem}>
						<View>
							<Image source={require('@assets/videoPrewatch.png')} style={styles.videoPrewatch} />
							<Icon
								name="play-circle"
								size={100}
								style={styles.videoPlay}
								color={theme.colors.white}
							/>
						</View>
						<Text style={styles.videoTitle}>learn python full course for beginner level 2020</Text>
					</View>
					<View style={styles.videoItem}>
						<View>
							<Image source={require('@assets/videoPrewatch.png')} style={styles.videoPrewatch} />
							<Icon
								name="play-circle"
								size={100}
								style={styles.videoPlay}
								color={theme.colors.white}
							/>
						</View>
						<Text style={styles.videoTitle}>learn python full course for beginner level 2020</Text>
					</View>
					<View style={styles.videoItem}>
						<View>
							<Image source={require('@assets/videoPrewatch.png')} style={styles.videoPrewatch} />
							<Icon
								name="play-circle"
								size={100}
								style={styles.videoPlay}
								color={theme.colors.white}
							/>
						</View>
						<Text style={styles.videoTitle}>learn python full course for beginner level 2020</Text>
					</View>
					<View style={styles.videoItem}>
						<View>
							<Image source={require('@assets/videoPrewatch.png')} style={styles.videoPrewatch} />
							<Icon
								name="play-circle"
								size={100}
								style={styles.videoPlay}
								color={theme.colors.white}
							/>
						</View>
						<Text style={styles.videoTitle}>learn python full course for beginner level 2020</Text>
					</View>
					<View style={styles.videoItem}>
						<View>
							<Image source={require('@assets/videoPrewatch.png')} style={styles.videoPrewatch} />
							<Icon
								name="play-circle"
								size={100}
								style={styles.videoPlay}
								color={theme.colors.white}
							/>
						</View>
						<Text style={styles.videoTitle}>learn python full course for beginner level 2020</Text>
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		header: {
			height: 250,
			justifyContent: 'flex-end',
		},
		headerTitle: {
			textTransform: 'capitalize',
			color: theme.colors.white,
			fontSize: 32,
			fontWeight: '800',
		},
		contentTitle: {
			fontSize: 32,
			fontWeight: '800',
			textTransform: 'capitalize',
			marginVertical: 24,
		},
		videoItem: {
			marginBottom: 30,
		},
		videoPrewatch: {
			width: '100%',
			height: 200,
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
			borderWidth: 2,
			elevation: 10,
		},
		videoPlay: {
			position: 'absolute',
			top: 50,
			zIndex: 10,
			alignSelf: 'center',
		},
		videoTitle: {
			fontSize: 20,
			textTransform: 'capitalize',
			fontWeight: '600',
			color: theme.colors.primary,
			lineHeight: 30,
			textDecorationLine: 'underline',
		},
	})

export default VideosScreen
