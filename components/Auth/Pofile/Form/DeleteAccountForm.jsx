import { useContext } from 'react';
import { useRouter } from 'next/router';

import { ProfileErrorContext } from '../ProfileContainer';
import deleteAccountProcess from '../../../../helper/auth/profile/forms/deleteAccountProcess';
import getErrorMessage from '../../../../helper/auth/profile/profileContainer/profileErrors/getErrorMessages';
import { COOKIE_NAME as NAME } from '../../../../env';
import { expireNow } from '../../../../helper/auth/authentication/cookieProps';

import style from '../../../../styles/Profile.module.sass';


const DeleteAccountForm = ({ props, forms, setForms }) => {

    const { _id } = props;
    const setProfileUpdateError = useContext(ProfileErrorContext || '')?.errorSetter;
    const router = useRouter();

    return (
        <div className={style.profileDescriptiveFormContainer}>
            <p style={{ color: '#535353' }}>Are you sure of deleting your account?</p>
            <div className={style.formButtonContainerReversed}>
                <button
                onClick={(e) =>
                    deleteAccountProcess(_id)
                    .then(() => setForms({ ...forms, deleteAccount: false }))
                    .then(() => document.cookie = `${NAME}=; ${expireNow}`)
                    .then(() => router.push('/Home'))
                    .catch(({ message }) => {
                        const errorMessage = getErrorMessage(message);
                        setProfileUpdateError({ errorState: true, errorMessage })
                        setTimeout(() => setProfileUpdateError({ errorState: false, errorMessage: null }), 6000);
                    })
                }>Delete Account</button>
                <button
                onClick={() => 
                    setForms({ 
                        ...forms, 
                        deleteAccount: false 
                    })
                }>Cancel</button>
            </div>
        </div>
    )
    
}

export default DeleteAccountForm;