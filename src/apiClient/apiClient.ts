
import  axios  from 'axios';

let Api = axios.create({
    baseURL: `${import.meta.env.React_APP_API_URL}/api`,
    withCredentials: true
})


export default Api;
