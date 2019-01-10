import { AsyncStorage } from 'react-native';

const saveCart = async (cartArray) => {
    //console.log('it here')
    const value = JSON.stringify(cartArray)
    if (value) 
        await AsyncStorage.setItem('@cart', value)
    //else 
        //console.log('not set, stringify failed:', key, value)
    //console.log('saveCart performing= '+cartArray)
};

export default saveCart;
