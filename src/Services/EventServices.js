import axios from 'axios'
import { authHeader } from '../_helpers';

const appClient= axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials:false,
    headers: authHeader()
});
    
export default{
    getBooks(){
        return appClient.get('/book/')
    }

}