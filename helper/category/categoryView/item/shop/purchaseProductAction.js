import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../../env';


const checkUserDeposit = async (userId, userToken, productEntity, productPrice) => {
    try {
        const response = await axios.get(`/api/server/users/${userId}/deposit`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
        const { deposit } = response.data;
    
        if ( (productEntity && productPrice) && (productEntity * productPrice) > deposit )
            throw new Error('');
        
        return deposit;
    } catch (e) {
        console.log('Error In Checking User Deposit On Next.JS Server.');
    }
}

const checkProductAvailability = async (productId, productEntity) => {
    try {
        const response = await axios.get(`/api/server/products/${productId}/entity`);
        if ( response.data.entity < productEntity )
            throw new Error('');

        return response.data.entity;
    } catch (e) {
        console.log('Error In Checking Product Availability On Next.JS Server.');
    }
}

const createTransactionAction = async (userToken, productId, ownerId, productEntity, productPrice) => {
    try {
        const response = await axios.post('/api/server/transactions', {
            productId, ownerId, productEntity, productPrice
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
    
        if ( !response.data.transaction )
            throw new Error('');
    
        return response.data.transaction;
    } catch (e) {
        console.log('Error In Creating Transaction Action On Next.JS Server.');
    }
}

const createActivityAction = async (userToken, productId, activityId, activityName) => {
    try {
        const response = await axios.post('/api/server/activities', {
            productId, activityId, activityName
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
    
        if ( !response.data )
            throw new Error('');
    
        return response.data;
    } catch (e) {
        return console.log('Error In Creating Activity On Next.JS Server.');
    }
}

const updateUserTransactions = async (userId, userToken, transactionId, userRole) => {
    try {
        await axios.post(`/api/server/users/${userId}/transactions`, { transactionId, userRole }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
    } catch (e) {
        console.log('Error In Updating User Transactions On Next.JS Server.');
    }
}

const updateUserActivities = async (userId, userToken, activityId) => {
    try {
        const response = await axios.put(`/api/server/users/${userId}/activity`, { activityId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });
    
        if ( response.status !== 200 )
            throw new Error('');
    } catch (e) {
        console.log('Error In Updating User Activities On Next.JS Server.');
    }
}

const updateUserDeposit = async (userId, userToken, productEntity, productPrice, userDeposit, userRole) => {
    const deposit = userRole === 'Buyer'
    ? userDeposit - (productEntity * productPrice)
    :
    userRole === 'Seller'
    ? userDeposit + (productEntity * productPrice)
    : null;

    try {
        await axios.put(`/api/server/users/${userId}/deposit`, { deposit }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        });    
    } catch (e) {
        console.log('Error In Updating User Deposit On Next.JS Server.');
    }
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
    try {
        const response = await axios.put(`/api/server/products/${productId}/entity`, {
            entity: productEntity
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
    
        if ( response.status !== 200 )
            throw new Error('');    
    } catch (e) {
        console.log('Error In Updating Product Status On Next.JS Server.');
    }
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