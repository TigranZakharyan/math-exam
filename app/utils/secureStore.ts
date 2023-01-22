import * as SecureStore from 'expo-secure-store'

const setItem = async (key: string, value: string): Promise<void> => {
	await SecureStore.setItemAsync(key, value)
}

const getItem = async (key: string): Promise<string | null> => {
	return await SecureStore.getItemAsync(key)
}

const deleteItem = async (key: string): Promise<void> => {
	await SecureStore.deleteItemAsync(key)
}

export default {
	getItem,
	setItem,
	deleteItem
}
