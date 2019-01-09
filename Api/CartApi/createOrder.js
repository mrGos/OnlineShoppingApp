import getUrl from '../../Common/UrlConfig';

export default createOrder = (orderViewModel, listcart) =>{
    
    let url = getUrl() + 'card'
    console.log(url,data);
    return fetch(url, {
        method: 'POST',
        header:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: SON.stringify({
            orderViewModel: orderViewModel,
            listcart: listcart,
          }),
    })
    .then(res => {
        return res.json()
    });
}