import axios from 'axios';

import { COOKIE_NAME as NAME } from '../../../env';
import { expireNow } from './cookieProps.js';


const Logout = async ({ token }) => {

    const cookie = token;
    const response = await axios.post('/api/logout', { cookie });

    if ( response.status !== 200 ) 
        return false;

    document.cookie = `${NAME}=; ${expireNow}`;
    return true;
}

export default Logout;