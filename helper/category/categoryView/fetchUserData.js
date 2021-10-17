import axios from 'axios';
import { sign } from 'jsonwebtoken';
import { SECRET_COOKIE_PASSWORD } from '../../../env';


const fetchUserData = async (userId) => {

    if ( !userId )
        return;

    const userToken = sign(userId, SECRET_COOKIE_PASSWORD);
    const url = 'http://localhost:4445/api/users';

    let response = null;

    try {
        response = await axios.get(`${url}/${userId}/likes`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        return response.data;
    } catch (e) {
        console.log(e);
    }

}

export default fetchUserData;