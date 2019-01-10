import getUrl from '../../Common/UrlConfig';
import axios from 'axios'


export const SignUp = (email, username,password  ) =>{
    let url = getUrl() + 'account/clientsignup?email='+email+'&username='+username+'&password='+password;
    let params = {
        username: username,
        email: email,
        password: password,
    }

    // return fetch(url, {
    //     method: 'POST',
    //     header:{
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    // })
    // .then(res => {
    //     return res.json()
    // });
    return axios({
        url: url,
        method: 'post',
        params: params,
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    })
    .then(res => {
        console.log(res.data)
        return res
    });
}

export const Login = (userName, password) =>{
    let url = getUrl() + 'account/clientlogin'
    
    // return fetch(url, {
    //     method: 'POST',
    //     header:{
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    // })
    // .then(res => {
    //     return res.json()
    // });
    let params = {
        userName: userName,
        password: password,
        rememberMe: false
    }
    return axios({
        url: url,
        method: 'post',
        params: params,
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    })
    .then(res => {
        console.log(res.data)
        return res.data
    });
    //return axios.post(url,data);
}