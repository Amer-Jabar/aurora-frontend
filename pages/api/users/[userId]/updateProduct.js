import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const updateUserProductThroughAPI = async (req, res) => {
    
    if ( req.method !== 'PUT' )
        return res.status(403).end();

    const { userId } = req.query;
    const { productId } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/product`;
    let response = null;

    try {
        response = await axios.put(url, { productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        return res.status(200).json({ ...response.data });
    } catch (e) {
        console.log('Error In Updating User Product On Next.JS Server.');
        return 403;
    }
}

export default updateUserProductThroughAPI;