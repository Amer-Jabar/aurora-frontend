import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../env';

import addActivityAction from './addActivityAction';


const updateUserProduct = async (userId, userToken, productId) => {
    
    const url = `http://localhost:4445/api/users/${userId}/product`;

    let response = null;

    try {
        response = await axios.put(url, { productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        return response;
    } catch (e) {
        return 403;
    }
}

const updateUserActivity = async (userId, userToken, activityId) => {
    
    const url = `http://localhost:4445/api/users/${userId}/activity`;

    let response = null;

    try {
        response = await axios.put(url, { activityId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        return response;
    } catch (e) {
        return 403;
    }
}

const postProductBody = async (name, category, price, entity, details, dimensions, description, userId, userToken) => {

    const productUrl = `http://localhost:4445/api/products`;
    const response = await axios.post(productUrl, {
        products: [{
            name, category, price, entity, details, dimensions, description, owner: userId
        }]
    }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    return response.data[0];
}

const postProductImage = async (productId, productImage, userToken) => {
    const productImageUrl = `http://localhost:4445/api/products/${productId}/image`;

    const form = new FormData();
    form.append('image', productImage, productId);

    const response = await axios.post(productImageUrl, form, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
    return response.data;
}

const postProduct = async (name, category, price, entity, details, dimensions, description, image, userId) => {

    const userToken = jwt.sign(userId, SECRET);

    try {
        const productId = await postProductBody(name, category, price, entity, details, dimensions, description, userId, userToken);
        const productImage = await postProductImage(productId, image, userToken);
        const activity = await addActivityAction(productId, 'Product', productId, userToken);
        const userActivity = await updateUserActivity(userId, userToken, activity._id);
        const userProduct = await updateUserProduct(userId, userToken, productId);

        if ( productId && productImage && activity && userActivity.status === 200 && userProduct.status === 200 )
            return true;
    } catch (e) {
        console.log(e);
    }
}


export default postProduct;