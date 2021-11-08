import axios from 'axios';
import jwt from 'jsonwebtoken';

import addActivityAction from './addActivityAction';
import { SECRET_COOKIE_PASSWORD as SECRET } from '../../env';


const updateUserProduct = async (userId, userToken, productId) => {
    
    const url = `/api/server/users/${userId}/product`;

    let response = null;

    try {
        response = await axios.put(url, { productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        return response;
    } catch (e) {
        console.log('Error In Updating User Product On Next.JS Server.');
        return 403;
    }
}

const updateUserActivity = async (userId, userToken, activityId) => {
    
    const url = `/api/server/users/${userId}/activity`;
    let response = null;

    try {
        response = await axios.put(url, { activityId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        return response;
    } catch (e) {
        console.log('Error In Updating User Activity On Next.JS Server.');
        return 403;
    }
}

const postProductBody = async (name, category, price, entity, details, dimensions, description, userId, userToken) => {

    const url = '/api/server/products';

    try {
        const response = await axios.post(url, {
            products: [{
                name, category, price, entity, details, dimensions, description, owner: userId
            }]
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
    
        return response.data[0];
    } catch (e) {
        console.log('Error In Product Form Body On Next.JS Server.');
        return null;
    }
}

const postProductImage = async (productId, productImage, userToken) => {
    
    const url = `/api/server/products/${productId}/image`;

    const form = new FormData();
    form.append('image', productImage, productId);

    try {
        const response = await axios.post(url, form, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        console.log('Error In Posting Product Image On Next.JS Server.');
        return null;
    }
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
        console.log('Error In Posting Product On Next.JS Server.');
    }
}


export default postProduct;