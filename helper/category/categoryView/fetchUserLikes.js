import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD } from '../../../env';


const fetchUserLikes = async (userId) => {

    if ( !userId )
        return;

    const userToken = sign(userId, SECRET_COOKIE_PASSWORD);

    const url = `/api/server/users/${userId}/likes`;
    let response = null;

    try {
        response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });

        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log('Error In Fetching User Likes.');
    }

}

export default fetchUserLikes;