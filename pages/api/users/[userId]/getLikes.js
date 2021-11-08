import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const fetchUserLikesThroughAPI = async (req, res) => {

    const { userId } = req.query;
    const userToken = req.headers.authorization.split(' ')[1];

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/likes`;
    let response = null;

    response = await axios.get(url, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    return res.status(200).send({ ...response.data });
}

export default fetchUserLikesThroughAPI;