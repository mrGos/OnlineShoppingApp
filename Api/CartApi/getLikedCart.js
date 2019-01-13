import { AsyncStorage } from 'react-native';
import global from './../../Common/global'
const getLikedCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@'+global.displayName);
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
