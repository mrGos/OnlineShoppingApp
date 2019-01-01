import getUrl from '../../Common/UrlConfig';

const getTopProduct = () => {
    let url= getUrl()+'product/getall?';
    url = url + 'keyword&page=0&pageSize=4';
     
    console.log('CurrentURLTP=' +url);  
    return fetch(url)
    .then(res => res.json());
};

export default getTopProduct;