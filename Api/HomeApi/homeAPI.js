import getUrl from '../../Common/UrlConfig';

const getHome = () => {
    let url= getUrl()+'home/getall';
    return fetch(url)
    .then(res => res.json());
};

export default getHome;