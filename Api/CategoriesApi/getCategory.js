import getUrl from '../../Common/UrlConfig';

// const getCategory = (idCategory, page, pagesize,sort = 'popular', totalRow= 10) => {
//     //let url= getUrl()+'product/getByCategory/'+idCategory+'/'+page+'/'+pagesize+'/'+sort+'/'+totalRow;
//     let url = getUrl() + 'product/getByCategory?'
//     let id =  `idCategory=${idCategory}&page=${page}&pagesize=${pagesize}&sort=${sort}&totalRow=${10}`
//     console.log('CurrentURL=' +url+id);  
//     return fetch(url+id)
//     .then(res => res.json());
// };

const getCategory = (idCategory, page, pagesize,sort = 'popular', totalRow= 10) => {
    //let url= getUrl()+'product/getByCategory/'+idCategory+'/'+page+'/'+pagesize+'/'+sort+'/'+totalRow;
    let url = getUrl() + 'product/getallbycategory?'
    let id =  `id=${idCategory}&page=${page}&pagesize=${pagesize}`
    console.log('CurrentURL=' +url+id);  
    return fetch(url+id)
    .then(res => res.json());
};

export default getCategory;