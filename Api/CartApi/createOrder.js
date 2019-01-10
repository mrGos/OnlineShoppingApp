import getUrl from '../../Common/UrlConfig';
import axios from 'axios';
import {Alert } from 'react-native'

export default createOrder =   (orderViewModel, listcart) =>{ 

let url = getUrl() + 'shoppingcart/createcart';

    let params = {
        orderViewModel: JSON.stringify(orderViewModel),
        listcart: JSON.stringify(listcart),
    }
    
//console.log(params);
//  return  axios.post(url, params, {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }).then(res => {
//         return res
//     }); 
return axios({
        url: url,
        method: 'post',
        params: params,
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    })
    .then(res => {
        return res
    });    
}