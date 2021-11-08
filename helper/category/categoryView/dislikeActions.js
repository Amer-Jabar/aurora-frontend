import axios from 'axios';


export const productDislikeAction = async (likeId, productId, userToken) => {

    const productUrl = `/api/server/products/${productId}/dislike`;
    let response = null;

    try {
        response = await axios.post(productUrl, { likeId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response;
    } catch (e) {
        console.log('Error In Product Dislike Action On Next.JS Server.');
    }
}

export const userDislikeAction = async (likeId, productId, userId, userToken) => {

    const userUrl = `/api/server/users/${userId}/dislike`;
    let response = null;

    try {
        response = await axios.post(userUrl, { likeId, productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        return response;
    } catch (e) {
        console.log('Error In User Dislike Action On Next.JS Server.');
    }
}

export const activityDeletionAction = async (activityId, userToken) => {

    const activityUrl = `/api/server/activities/${activityId}`;

    try {
        const response = await axios.delete(activityUrl, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        
        return response;
    } catch (e) {
        console.log('Error In Activity Deletion Action On Next.JS Server.');
    }
}

export const likeDeletionAction = async (likeId, userToken) => {

    const likeUrl = `/api/server/likes/${likeId}`;
    let response = null; 

    try {
        response = await axios.delete(likeUrl, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        return response.data;
    } catch (e) {
        console.log('Error In Like Deletion Action On Next.JS Server.');
    }
}