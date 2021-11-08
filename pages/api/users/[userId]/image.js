import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const fetchProductImage = async (req, res) => {

    const { userId } = req.query;

    let image = null;
    try {
        image = await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/image`);
    } catch (e) {
        image = null;
    }

    return res.status(200).end(image);
}

export default fetchProductImage;