import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../env';


export const productDislikeAction = async (likeId, productId, userToken) => {

    const productUrl = `http://localhost:4445/api/products/${productId}/dislike`;

    let response = null;

    try {

        response = await axios.post(productUrl, { likeId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response;

    } catch (e) {
        console.log(e);
    }
}

export const userDislikeAction = async (likeId, productId, userId, userToken) => {

    const userUrl = `http://localhost:4445/api/users/${userId}/dislike`;

    let response = null;

    try {

        response = await axios.post(userUrl, { likeId, productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        return response;

    } catch (e) {
        console.log(e);
    }
}

export const activityDeletionAction = async (activityId, userToken) => {

    const activityUrl = `http://localhost:4445/api/activities/${activityId}`;

    try {
        const request = await axios.delete(activityUrl, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        return request
    } catch (e) {
        console.log(e);
    }
}

export const likeDeletionAction = async (likeId, userToken) => {

    const likeUrl = `http://localhost:4445/api/likes/${likeId}`;

    let response = null; 

    try {

        response = await axios.delete(likeUrl, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        return response.data;

    } catch (e) {
        console.log(e);
    }
}