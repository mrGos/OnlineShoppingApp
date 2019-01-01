import getUrl from '../../Common/UrlConfig';

export default getCart = (data) =>{
    
    let url = getUrl() + 'card'
    console.log(url,data);
    return fetch(url, {
        method: 'POST',
        header:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data})
    })
    .then(res => {
        return res.json()
    });
}