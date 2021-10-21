import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import jwt from 'jsonwebtoken';

import ProcessLoadingSpinner from '../../../../Partials/ProcessLoadingSpinner';
import PurchaseList from './ProfilePurchases/PurchasesList';
import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../../env';

import style from '../../../../../styles/Profile.module.sass';


const loadUserPurchases = async (userId) => {

    if ( !userId )
        return null;

    const userToken = jwt.sign(userId, SECRET);

    try {
        const response = await axios.get(`http://localhost:4445/api/users/${userId}/purchases`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        return response.data;
    } catch (e) {
        return null;
    }

}

const useLoad = (callback, userId) => {

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setPending(true);
        callback(userId)
        .then(response => setData(response))
        .catch(err => setError(true))
        .finally(() => setPending(false))
    }, [callback, userId]);

    return { pending, error, data };
}

const ProfilePurchases = () => {
    
    const { userInfo } = useSelector(state => state.User);
    const { pending, error, data } = useLoad(loadUserPurchases, userInfo?._id)

    useEffect(() => {}, [pending, error, data]);
    console.log({ pending, error, data });

    return (
        <div className={style.purchasesContainer}>
            <h1>User Purchases</h1>
            <section>
                {
                    pending
                    ? <ProcessLoadingSpinner loading={true} fillScreen={true} relative={true} />
                    : <></>
                }
                {
                    error
                    ? <div className={style.purchaseFetchError}>An error occured during data fetch.</div>
                    : <></>
                }
                {
                    !pending && data && data?.length > 0
                    ? <PurchaseList userPurchases={data} />
                    : !pending && ( !data || data?.length === 0 )
                    ? <div className={style.emptyPurchaseContainer}>No purchases have been done yet.</div>
                    : <></>
                }
            </section>
        </div>
    )
}

export default ProfilePurchases;