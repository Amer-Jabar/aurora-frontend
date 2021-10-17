import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const createReviewAction = async (ownerId, productId, reviewContent, reviewRating, userToken) => {

    let response = null;

    try {
        response = await axios.post('http://localhost:4445/api/reviews', {
            ownerId, productId, reviewContent, reviewRating
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (e) {
        return null;
    }
}

const createActivityAction = async (productId, activityId, activityName, userToken) => {

    let response = null;

    try {
        response = await axios.post('http://localhost:4445/api/activities', {
            productId, activityId, activityName
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (e) {
        return null;
    }   
}

const updateProductAction = async (productId, reviewId, userToken) => {

    let response = null;

    try {
        response = await axios.post(`http://localhost:4445/api/products/item/${productId}/review`, { reviewId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (e) {
        return null;
    }  
}

const updateUserAction = async (productId, reviewId, userId, userToken, activityId) => {
    try {
        await axios.put(`http://localhost:4445/api/users/${userId}/activity`, { activityId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        const response = await axios.post(`http://localhost:4445/api/users/${userId}/review`, { productId, reviewId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (e) {
        return null;
    }  
}

const addReview = async (ownerId, productId, userId, reviewContent, reviewRating) => {

    const userToken = jwt.sign(userId, SECRET);

    const reviewStatus = await createReviewAction(ownerId, productId, reviewContent, reviewRating, userToken);
    const activityStatus = await createActivityAction(productId, reviewStatus._id, 'Review', userToken);
    const productStatus = await updateProductAction(productId, reviewStatus._id, userToken);
    const userStatus = await updateUserAction(productId, reviewStatus._id, userId, userToken, activityStatus._id);

    if ( reviewStatus && activityStatus && productStatus && userStatus )
        return reviewStatus;
    else
        throw new Error(409);
}

export default addReview;