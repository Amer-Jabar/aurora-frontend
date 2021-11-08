import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const likeCreationActionThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { productId } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const likeUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/likes`;
    const response = (await axios.post(likeUrl, { productId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    }));

    return res.status(200).json({ ...response.data });
}

export default likeCreationActionThroughAPI;