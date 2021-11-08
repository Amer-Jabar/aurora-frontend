import axios from 'axios';


export const likeCreationAction = async (productId, userToken) => {
    
    const likeUrl = '/api/server/likes';
    const like = (await axios.post(likeUrl, { productId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })).data;

    return like;
}

export const userLikeAction = async (likeId, userId, userToken) => {
    try {
        const userUrl = `/api/server/users/${userId}/like`;
        const response = await axios.post(userUrl, { likeId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        
        return response.status;
    } catch (e) {
        console.log('Error In User Like Action On Next.JS Server.');
    }
}

export const productLikeAction = async (likeId, productId, userToken) => {

    const productUrl = `/api/server/products/${productId}/like`;

    try {
        const response = await axios.post(productUrl, { likeId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });

        return response.status;
    } catch (e) {
        console.log('Error In Product Like Action On Next.JS Server.');
    }

}