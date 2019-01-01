import getUrl from '../../Common/UrlConfig';

const getAllCategory = () => {
    let url= getUrl()+'productcategory/getallparents';
    console.log('CurrentURL=' +url);  
    return fetch(url)
    .then(res => res.json());
};

export default getAllCategory;