import getUrl from '../../Common/UrlConfig';
import axios from 'axios';

export default createOrder = (orderViewModel, listcart) =>{
    
    
var params =JSON.stringify({'orderViewModel':orderViewModel,'listcart':listcart})
let url = getUrl() + 'shoppingcart/createcart';

let data = JSON.stringify({
    orderViewModel: orderViewModel,
    listcart: listcart,
})

axios.post(url, data, {
    headers: {
        'Content-Type': 'application/json',
    }
}).then(res => {
    return res
}); 
// return axios({
//         url: url,
//         method: 'post',
//         params: params,
//         headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         }
//     })
    // .then(res => {
    //     return res
    // });    
}