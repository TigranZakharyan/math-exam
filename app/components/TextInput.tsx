import React from 'react'
import { TextInput as Input, TextInputProps } from 'react-native'

type Props = Omit<TextInputProps, 'onChangeText'> & {
  onChangeText: (name: string, text: string) => void;
  name: string;
}

const TextInput = ({ value, onChangeText, name, ...props }: Props): JSX.Element => {
	return <Input value={value} onChangeText={(value) => onChangeText(name, value)} {...props} />
}

export default TextInput
