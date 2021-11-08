import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const postProductImageThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { productId } = req.query;
    const { form } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/${productId}/image`
    let response = null;

    console.log('Before posting image', form);

    try {
        response = await axios.post(url, form, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    console.log('After posting image');
    console.log(response);

    return res.status(200).json({ ...response.data });
}

export default postProductImageThroughAPI;