import getUrl from '../../Common/UrlConfig';

const getDetail = (id) => {
    let url= getUrl()+'product/getbyid/'+id;
    console.log('CurrentURL=' +url);  
    return fetch(url)
    .then(res => res.json());
};

export default getDetail;