import  axios  from 'axios';

let Api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true
})


export default Api;
