import getUrl from '../../../Common/UrlConfig';

const getAllProduct = (keyword,page,pageSize) => {
    let url= getUrl()+'product/getall?';
    if(keyword == ""){
        url = url + 'keyword&page='+page+'&pageSize='+pageSize;
    }else{
        url = url + 'keyword='+keyword+'&page='+page+'&pageSize='+pageSize;
    } 
    console.log('CurrentURL=' +url);  
    return fetch(url)
    .then(res => res.json());
};

export default getAllProduct;