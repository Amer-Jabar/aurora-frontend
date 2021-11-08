import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const userDislikeActionThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { userId } = req.query;
    const { likeId, productId } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const userUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/dislike`;
    let response = await axios.post(userUrl, { likeId, productId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })
    
    return res.status(200).send(response);
}

export default userDislikeActionThroughAPI;