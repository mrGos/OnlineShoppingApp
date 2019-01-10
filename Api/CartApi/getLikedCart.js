import { AsyncStorage } from 'react-native';

const getLikedCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@likedCart');
        if (value !== null) {
            return JSON.parse(value);            
        }
        return [];
    } catch (error) {
    // Error retrieving data
        return [];
    }
};

export default getLikedCart;
