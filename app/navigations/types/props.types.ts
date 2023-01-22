import { Book, Quiz } from '@features';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  BottomTabNavigator: undefined;
  AuthNavigator: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
}

export type BottomTabStackParamList = {
  HomeNavigator: undefined;
  QuestionsScreen: undefined;
  VideosScreen: undefined;
  BooksNavigator: undefined;
}

export type BooksStackParamList = {
  BooksScreen: undefined;
  PdfReaderScreen: Book;
}

export type HomeStackParamList = {
  HomeScreen: undefined;
  QuizScreen: Quiz;
}

export type BottomTabNavigatorProps = NativeStackScreenProps<RootStackParamList, 'BottomTabNavigator'>;
export type AuthNavigatorProps = NativeStackScreenProps<RootStackParamList, 'AuthNavigator'>;

export type HomeNavigatorProps = NativeStackScreenProps<BottomTabStackParamList, 'HomeNavigator'>;
export type QuestionsScreenProps = NativeStackScreenProps<BottomTabStackParamList, 'QuestionsScreen'>;
export type VideosScreenProps = NativeStackScreenProps<BottomTabStackParamList, 'VideosScreen'>;
export type BooksNavigatorProps = NativeStackScreenProps<BottomTabStackParamList, 'BooksNavigator'>;


export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;
export type QuizScreenProps = NativeStackScreenProps<HomeStackParamList, 'QuizScreen'>;

export type BooksScreenProps = NativeStackScreenProps<BooksStackParamList, 'BooksScreen'>;
export type PdfReaderScreenProps = NativeStackScreenProps<BooksStackParamList, 'PdfReaderScreen'>;