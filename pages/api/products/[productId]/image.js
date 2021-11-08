import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const fetchProductImage = async (req, res) => {

    const { productId } = req.query;

    let image = null;
    try {
        image = await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/${productId}/image`);
    } catch (e) {
        image = null;
    }

    return res.end(image.data);
}

export default fetchProductImage;