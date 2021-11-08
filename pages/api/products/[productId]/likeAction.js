import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const productLikeActionThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { productId } = req.query;
    const { likeId } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const productUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/${productId}/like`;
    await axios.post(productUrl, { likeId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
    
    return res.status(200).json({});
}

export default productLikeActionThroughAPI;