import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../env';


const loadProfile = (userId, setProps, setUserDataFetched) => {

    const userToken = sign(userId, SECRET);
    
    axios.get(`/api/server/users/${userId}`, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })
    .then(response => response.data)
    .then(userInfo => {
        setProps(userInfo);
        setUserDataFetched(true);
    })
    .catch(e => console.log(e))
}

export default loadProfile;