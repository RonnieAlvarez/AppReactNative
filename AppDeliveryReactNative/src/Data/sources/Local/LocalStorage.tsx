import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = () => {
	const save = async (key: string, value: string) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log('Error en LocalStorage ', error);
		}
	};

	const getItem = async (key: string) => {
		try {
			const item = await AsyncStorage.getItem(key);
			return item;
		} catch (error) {
			console.log('Error en LocalStorage ', error);
		}
	};

	return { save, getItem };
};
