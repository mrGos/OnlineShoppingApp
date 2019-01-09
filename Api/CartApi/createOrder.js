import getUrl from '../../Common/UrlConfig';
import axios from 'axios';

export default createOrder = async  (orderViewModel, listcart) =>{ 

let url = getUrl() + 'shoppingcart/createcart';

const params = JSON.stringify({
    orderViewModel: orderViewModel,
    listcart: listcart==null?"nodata":listcart,
})

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