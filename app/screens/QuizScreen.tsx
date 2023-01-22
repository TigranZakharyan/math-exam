import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Button, Text } from '@rneui/themed';
import { Container, Header } from '@components';
import * as Progress from 'react-native-progress';
import { Theme } from '@rneui/base';
import { QuizScreenProps } from '@navigations/types';
import { Answer, Question } from '@features';
import { useNavigation } from '@react-navigation/native';


type QuestionState = {
    item: Question | null;
    answeredOption: string | null;
    index: number;
}

type HistoryState = {
    question: {
        item: Question | null;
        answeredOption: string | null;
    },
    isCorrect: boolean;
}

const intitialQuestion: QuestionState = {
    item: null,
    answeredOption: null,
    index: 0,
}

const QuizScreen = (props: QuizScreenProps): JSX.Element => {
    const { theme } = useTheme();
    const  { route: { params } } = props;
    const navigation = useNavigation()
    const styles = makeStyles(theme);

    const [answered, setAnswered] = React.useState<boolean>(false);
    const [history, setHistory] = React.useState<Array<HistoryState>>([]);
    const [question, setQuestion] = React.useState<QuestionState | null>(intitialQuestion);

    const ANSWER_DURATION: number = 1500;
    const QEUESTIONS_LENGTH: number = params.questions.length;
    const PROGRESS: number = question?.index ? 1 / QEUESTIONS_LENGTH * question.index : 0;

    const handleStart = () => {
        setQuestion({
            item: params.questions[0],
            answeredOption: '',
            index: 1,
        });
    }

    const handleNext = () => {
        setAnswered(true);
        setTimeout(() => {
            setAnswered(false);
            question && setHistory([...history, {
                question,
                isCorrect: question.item?.answers.some((e) => e.isCorrect && e.title === question.answeredOption) ?? false
            }])
            setQuestion((prev) => {
                let newIndex = prev?.index ? prev.index + 1 : 0;
                if(prev?.index !== QEUESTIONS_LENGTH) {
                    return {
                        ...intitialQuestion,
                        item: params.questions[prev?.index || 0],
                        answeredOption: null,
                        index: newIndex,
                    }
                }
                return prev;
            })

        }, ANSWER_DURATION);
    }

    const handleAnswer = (text: string) => {
        question && setQuestion({
            ...question,
            answeredOption: text
        })
    }
    let rightAnsweres = 0;
    history.forEach((e) => e.isCorrect ? rightAnsweres += 1 : null);
    return (
		<SafeAreaView>
            <ScrollView>
                <Header exitColor={theme.colors.secondary} menuColor={theme.colors.secondary} />
                <Container>
                    <View style={styles.status}>
                        <Text style={styles.statusTitle}>{ params.title }</Text>
                        <View style={styles.statusProgressBox}>
                            <Progress.Bar 
                                progress={PROGRESS}
                                borderRadius={50}
                                height={30}
                                width={250}
                                borderColor="transparent"
                                color={theme.colors.warning}
                                style={styles.statusProgress}
                            />
                            <Text style={styles.statusText}>{ question?.index }/{ QEUESTIONS_LENGTH }</Text>
                        </View>
                    </View>
                    {
                        question?.item && history.length !== QEUESTIONS_LENGTH ? (
                            <View>
                                <Text style={styles.questionNumber}>Question - {question?.index}</Text>
                                <Text style={styles.questionTitle}>{ question.item?.title }</Text>
                                <View>
                                    {
                                        question.item?.answers.map((e: Answer) => {
                                            const rightAnswer: boolean = answered && e.isCorrect;
                                            const wrongAnswer: boolean = answered && !e.isCorrect && e.title === question.answeredOption;
                                            const answeredStyle = (rightAnswer && styles.rightOption) || (wrongAnswer && styles.wrongOption);
                                            return (
                                                <Button
                                                    key={e.title}
                                                    title={e.title}
                                                    onPress={() => handleAnswer(e.title)}
                                                    disabled={answered}
                                                    disabledTitleStyle={styles.optionTitle}
                                                    disabledStyle={answeredStyle || styles.optionBox}
                                                    containerStyle={styles.optionContainer}
                                                    buttonStyle={styles.optionBox}
                                                    titleStyle={styles.optionTitle}
                                                    icon={{
                                                        name: question.answeredOption === e.title ? 'checkmark-circle' : '',
                                                        type: 'ionicon',
                                                        style: styles.optionIcon,
                                                        color: theme.colors.warning
                                                    }}
                                                    iconPosition="right"
                                                />
                                            )
                                        })
                                    }
                                </View>
                                <Button
                                    title="Next Question"
                                    containerStyle={styles.nextBtn}
                                    disabled={answered}
                                    onPress={handleNext}
                                />
                            </View>
                        ) : history.length ? (
                            <View style={styles.finishBox}>
                                <Text style={styles.finishText}> You've got </Text>
                                <Text style={styles.finishText}> { rightAnsweres } / { QEUESTIONS_LENGTH } </Text>
                                <Button 
                                    title="To Main"
                                    size='lg'
                                    titleStyle={styles.toMainTitle}
                                    buttonStyle={styles.toMainBtn}
                                    onPress={navigation.goBack}
                                />
                            </View>
                        ) : (
                            <View>
                                <Button
                                    title="Start the quiz"
                                    titleStyle={{fontSize: 24}}
                                    buttonStyle={styles.startBtn}
                                    onPress={handleStart}
                                />
                            </View>
                        )
                    }
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

const makeStyles = (theme: Theme) => 
    StyleSheet.create({
        box: {
            height: '100%',
        },
        status: {
            alignItems: 'center',
        },
        statusTitle: {
            fontSize: 40,
            color: theme.colors.warning,
            fontWeight: '900',
        },
        statusProgressBox: {
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: theme.colors.grey5,
            backgroundColor: theme.colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 12,
        },
        statusProgress: {
            backgroundColor: theme.colors.white,
            elevation: 4,
        },
        statusText: {
            fontSize: 26,
            fontWeight: '800',
            color: theme.colors.warning,
            marginLeft: 18
        },
        remainingTime: {
            color: theme.colors.grey2,
            fontSize: 28,
            fontWeight: '800',
        },
        questionNumber: {
            color: theme.colors.primary,
            fontSize: 30,
            fontWeight: '800',
        },
        questionTitle: {
            color: theme.colors.grey2,
            fontSize: 24,
            fontWeight: '500'
        },
        optionContainer: {
            marginVertical: 8,

        },
        optionBox: {
            backgroundColor: theme.colors.white,
            elevation: 5,
            justifyContent: 'space-between'
        },
        rightOption: {
            backgroundColor: theme.colors.success,
            color: theme.colors.white,
        },
        wrongOption: {
            backgroundColor: theme.colors.error,
            color: theme.colors.white,
        },
        optionTitle: {
            flexShrink: 1,
            color: theme.colors.black,
            fontSize: 18,
            fontWeight: '500',
            textAlign: 'left',
        },
        optionIcon: {
            flexBasis: 24,
            width: 24,
            height: 24,
        },
        nextBtn: {
            width: 250,
            margin: 8,
            alignSelf: 'center',
            backgroundColor: theme.colors.primary,
            color: theme.colors.white
        },
        startBtn: {
            backgroundColor: theme.colors.warning,
            marginTop: 200
        },
        finishBox: {
            alignItems: 'center',
            paddingVertical: 90,
        },
        finishText: {
            fontSize: 32,
            fontWeight: '800'
        },
        toMainBtn: {
            width: 200,
            marginVertical: 24,
            borderRadius: 20,
            backgroundColor: theme.colors.secondary,
        },
        toMainTitle: {
            fontSize: 24,
        }
    })

export default QuizScreen
