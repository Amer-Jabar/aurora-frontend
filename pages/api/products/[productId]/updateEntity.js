import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const updateProductEntityThroughAPI = async (req, res) => {

    if ( req.method !== 'PUT' )
        return res.status(403).end();

    const { productId } = req.query;
    const { entity } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    await axios.put(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/${productId}/entity`, { entity }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    return res.status(200).json({});
}

export default updateProductEntityThroughAPI;