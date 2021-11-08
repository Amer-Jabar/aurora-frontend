import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const addViewToProduct = async (productId) => {

    const product = jwt.sign({ productId }, SECRET);

    await axios.post(`/api/server/products/${productId}/view`, { product });
}

export default addViewToProduct;