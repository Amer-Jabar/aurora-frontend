import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const addViewToProduct = async (productId) => {

    const product = jwt.sign({ productId }, SECRET);

    const baseUrl = 'http://localhost:4445/api/products';

    await axios.post(`${baseUrl}/${productId}/view`, { product });
}

export default addViewToProduct;