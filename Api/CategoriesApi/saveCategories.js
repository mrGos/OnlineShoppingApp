import { AsyncStorage } from 'react-native';

const saveCart = async (categoryArray) => {
    console.log('it here')
    const value = JSON.stringify(categoryArray)
    if (value) 
        await AsyncStorage.setItem('@category', value)
    else 
        console.log('not set, stringify failed:', key, value)
    console.log('saveCategory performing= '+categoryArray)
};

export default saveCart;
