import React from 'react'
import { Container } from '@components'
import { fonts, Skeleton, Theme } from '@rneui/base'
import { useTheme } from '@rneui/themed'
import Carousel from 'react-native-anchor-carousel'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@hooks'
import { fetchBooks, selectBooks } from '@features/reducers/booksSlice'
import { Book } from '@features'
import { useNavigation } from '@react-navigation/native'

type CarouselArgs = {
  item: Book | null,
};

const {width: windowWidth} = Dimensions.get('window')

const BooksScreen = (): JSX.Element => {
	const carouselRef = React.useRef(null)
	const dispatch = useAppDispatch()
	const navigation = useNavigation()
	const { theme } = useTheme()
	const books = useAppSelector(selectBooks)
	const styles = makeStyles(theme)

	const carouselRenderItem = ({ item }: CarouselArgs): JSX.Element => {
		if(item) {
			return (
				<TouchableOpacity onPress={() => navigation.navigate('PdfReaderScreen' as never, item as never)}>
					<Image source={{uri: item.preview}} style={styles.carouselItem} />
				</TouchableOpacity>
			)
		}
		return <Skeleton animation='wave' style={styles.carouselItem} />
	}

	React.useEffect(() => {
		dispatch(fetchBooks())
	}, [])
	const skeletonData = new Array(3).fill(null)
	return (
		<SafeAreaView>
			<ScrollView>
				<Carousel
					ref={carouselRef}
					data={books.loading || books.data.length === 0 ? skeletonData : books.data}
					style={styles.carouselBox}
					renderItem={carouselRenderItem}
					itemWidth={windowWidth * 0.7}
					containerWidth={windowWidth}
					separatorWidth={10}
				/>
				<Container>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Top Read Books</Text>
						<View style={styles.sectionBox}>
							<Image source={require('@assets/topRead1.png')} style={styles.bookImg} />
							<Image source={require('@assets/topRead2.png')} style={styles.bookImg} />
						</View>
					</View>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Recommended Books</Text>
						<View style={styles.sectionBox}>
							<Image source={require('@assets/recommended1.png')} style={styles.bookImg} />
							<Image source={require('@assets/recommended2.png')} style={styles.bookImg} />
							<Image source={require('@assets/recommended3.png')} style={styles.bookImg} />
						</View>
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		carouselBox: {
			height: 250,
		},
		carouselItem: {
			flexBasis: '100%',
			margin: 10,
			borderRadius: 10,
		},
		section: {
			marginTop: 30,
		},
		sectionTitle: {
			textTransform: 'capitalize',
			fontSize: 32,
			fontWeight: '800',
		},
		sectionBox: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 20,
			flexWrap: 'wrap',
		},
		bookImg: {
			flexBasis: 150,
			borderRadius: 10,
			borderWidth: 1,
			margin: 3,
			flex: 1,
			borderColor: theme.colors.secondary,
		},
	})

export default BooksScreen
