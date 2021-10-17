import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../../env';


const checkUserDeposit = async (userId, userToken, productEntity, productPrice) => {
    const request = await axios.get(`http://localhost:4445/api/users/${userId}/deposit`, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
    const { deposit } = request.data;

    if ( (productEntity && productPrice) && (productEntity * productPrice) > deposit )
        throw new Error;
    
    return deposit;
}

const checkProductAvailability = async (productId, productEntity) => {
    const request = await axios.get(`http://localhost:4445/api/products/${productId}/entity`);
    if ( request.data.entity < productEntity )
        throw new Error;

    return request.data.entity;
}

const createTransactionAction = async (userToken, productId, ownerId, productEntity, productPrice) => {
    const request = await axios.post('http://localhost:4445/api/transactions', {
        productId, ownerId, productEntity, productPrice
    }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    if ( !request.data.transaction )
        throw new Error;

    return request.data.transaction;
}

const createActivityAction = async (userToken, productId, activityId, activityName) => {
    const request = await axios.post('http://localhost:4445/api/activities', {
        productId, activityId, activityName
    }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    if ( !request.data )
        throw new Error;

    return request.data;
}

const updateUserTransactions = async (userId, userToken, transactionId, userRole) => {
    await axios.post(`http://localhost:4445/api/users/${userId}/transaction`, { transactionId, userRole }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
}

const updateUserActivities = async (userId, userToken, activityId) => {
    const request = await axios.put(`http://localhost:4445/api/users/${userId}/activity`, { activityId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    if ( request.status !== 200 )
        throw new Error;
}

const updateUserDeposit = async (userId, userToken, productEntity, productPrice, userDeposit, userRole) => {
    const deposit = userRole === 'Buyer'
    ? userDeposit - (productEntity * productPrice)
    :
    userRole === 'Seller'
    ? userDeposit + (productEntity * productPrice)
    : null;

    await axios.put(`http://localhost:4445/api/users/${userId}/deposit`, { deposit }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
}

const updateUserStatus = async (userId, userToken, productEntity, productPrice, userDeposit, transactionId, activityId) => {
    updateUserTransactions(userId, userToken, transactionId, 'Buyer');
    updateUserActivities(userId, userToken, activityId);
    updateUserDeposit(userId, userToken, productEntity, productPrice, userDeposit, 'Buyer');
}

const updateOwnerStatus = async (ownerId, ownerToken, productEntity, productPrice, ownerDeposit, transactionId, activityId) => {
    updateUserTransactions(ownerId, ownerToken, transactionId, 'Seller');
    updateUserActivities(ownerId, ownerToken, activityId);
    updateUserDeposit(ownerId, ownerToken, productEntity, productPrice, ownerDeposit, 'Seller');
}

const updateProductStatus = async (userToken, productId, productEntity) => {
    const request = await axios.put(`http://localhost:4445/api/products/${productId}/entity`, {
        entity: productEntity
    }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    if ( request.status !== 200 )
        throw new Error;
}

const purchaseProductAction = async (userId, ownerId, productId, productEntity, productPrice) => {

    const userToken = jwt.sign(userId, SECRET);
    const ownerToken = jwt.sign(ownerId, SECRET);

    await checkProductAvailability(productId, productEntity);
    const userDeposit = await checkUserDeposit(userId, userToken, productEntity, productPrice);
    const ownerDeposit = await checkUserDeposit(ownerId, ownerToken);

    const transaction = await createTransactionAction(userToken, productId, ownerId, productEntity, productPrice);
    const activity = await createActivityAction(userToken, productId, transaction._id, 'Transaction');

    updateUserStatus(userId, userToken, productEntity, productPrice, userDeposit, transaction?._id, activity?._id);
    updateOwnerStatus(ownerId, ownerToken, productEntity, productPrice, ownerDeposit, transaction?._id, activity?._id);
    updateProductStatus(userToken, productId, productEntity);

    return true;
};

export default purchaseProductAction;