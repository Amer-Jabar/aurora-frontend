import axios from 'axios';


export const likeCreationAction = async (productId, userToken) => {
    const likeUrl = `http://localhost:4445/api/likes`;
    const like = (await axios.post(likeUrl, { productId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })).data;

    return like;
}

export const userLikeAction = async (likeId, userId, userToken, productId) => {
    try {
        const userUrl = `http://localhost:4445/api/users/${userId}/like`;
        const response = await axios.post(userUrl, { likeId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        return response.status;
    
    } catch (e) {
        console.log(e);
    }
}

export const productLikeAction = async (likeId, productId, userToken) => {
    const productUrl = `http://localhost:4445/api/products/${productId}/like`;
    const response = await axios.post(productUrl, { likeId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
    return response.status;
}