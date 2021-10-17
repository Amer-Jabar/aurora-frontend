import axios from 'axios';
import { sign, verify } from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../env';


const loadProfile = (_id, setProps, setUserDataFetched) => {

    const userToken = sign(_id, SECRET);
    axios.get(`http://localhost:4445/api/users/${_id}`, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })
    .then(response => response.data)
    .then(userInfo => {
        console.log(userInfo);
        setProps(userInfo);
        setUserDataFetched(true);
    })
    .catch(e => console.log('Error is here!'))
}

export default loadProfile;