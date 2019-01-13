import { AsyncStorage } from 'react-native';
import global from './../../Common/global'

const saveLikedCart = async (cartArray) => {
    console.log('it here')
    const value = JSON.stringify(cartArray)
    if (value) 
        await AsyncStorage.setItem('@'+global.displayName, value)
    //else 
        //console.log('not set, stringify failed:', key, value)
    //console.log('saveCart performing= '+cartArray)
};

export default saveLikedCart;
