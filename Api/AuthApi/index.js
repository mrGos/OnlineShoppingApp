import getUrl from '../../Common/UrlConfig';

export const SignUp = (data) =>{
    let url = getUrl() + 'signup'
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
        const respones =  res.json()
        return respones
    });
    //return axios.post(url,data);
}

export const Login = (data) =>{
    let url = getUrl() + 'login'
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
        const respones =  res.json()
        return respones
    });
    //return axios.post(url,data);
}