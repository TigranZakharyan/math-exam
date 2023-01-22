import React, { Dispatch, SetStateAction } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Text, Theme } from '@rneui/base'
import { useTheme, Icon } from '@rneui/themed'

type Props = {
    alert: null | string;
    removeAlert: () => void;
    setAlert: Dispatch<SetStateAction<null | string>>
}

const ErrorAlert: React.FC<Props> = (props): JSX.Element => {
    const { theme } = useTheme()
    const styles = makeStyles(theme)
    const topAnim = React.useRef(new Animated.Value(-100)).current
    const opacityAnim = React.useRef(new Animated.Value(0)).current

    const hide = () => {
        Animated.parallel([
            Animated.timing(
                topAnim,
                {
                    toValue: -100,
                    duration: 1000,
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                opacityAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }
            )
        ]).start(props.removeAlert)
    }

    React.useEffect(() => {
        if(props.alert) {
            Animated.parallel([
                Animated.timing(
                    topAnim,
                    {
                        toValue: 35,
                        duration: 1000,
                        useNativeDriver: false
                    }
                ),
                Animated.timing(
                    opacityAnim,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false
                    }
                )
            ]).start(() => setTimeout(hide, 2000))
        }
    }, [props.alert])

    return(
        <Animated.View style={{...styles.box, top: topAnim, opacity: opacityAnim}}>
            <Icon name='error' size={20} color={theme.colors.white}/>
            <Text style={styles.text}>{ props.alert }</Text>
        </Animated.View>
    )
}


const makeStyles = (theme: Theme) => StyleSheet.create({
    box: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        position: 'absolute',
        zIndex: 100,
        left: '10%',
        backgroundColor: theme.colors.error,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: theme.colors.white,
        marginLeft: 14
    }
})

export default ErrorAlert
