import getUrl from '../../Common/UrlConfig';

const getLasted = (top) => {
    let url= getUrl()+'product/lastest?top=5'
     
    console.log('CurrentURLTP=' +url);  
    return fetch(url)
    .then(res => res.json());
};

export default getLasted;