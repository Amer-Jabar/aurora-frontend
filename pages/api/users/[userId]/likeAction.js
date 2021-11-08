import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


export const userLikeActionThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { likeId } = req.body;
    const { userId } = req.query;
    const userToken = req.headers.authorization.split(' ')[1];

    const userUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/like`;
    await axios.post(userUrl, { likeId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    return res.status(200).json({});
}

export default userLikeActionThroughAPI;