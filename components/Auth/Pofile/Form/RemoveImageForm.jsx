import { useEffect, useContext } from 'react';

import { ProfileErrorContext } from '../ProfileContainer';
import removeImageProcess from '../../../../helper/auth/profile/forms/removeImageProcess';
import getErrorMessage from '../../../../helper/auth/profile/profileContainer/profileErrors/getErrorMessages';

import style from '../../../../styles/Profile.module.sass';


const UploadImageForm = ({ props, forms, setForms, setUserDataFetched }) => {
    const { _id } = props;
    const setProfileUpdateError = useContext(ProfileErrorContext || '')?.errorSetter;

    return (
        <div className={style.profileDescriptiveFormContainer}>
            <p style={{ color: '#535353' }}>Are you sure of removing your profile photo?</p>
            <div className={style.formButtonContainerReversed}>
                <button
                onClick={(e) =>
                    removeImageProcess(e, _id)
                    .then(() => setForms({ ...forms, uploadImage: false }))
                    .then(() => setUserDataFetched(null))
                    .catch(({ message }) => {
                        const errorMessage = getErrorMessage(message);
                        setProfileUpdateError({ errorState: true, errorMessage })
                        setTimeout(() => setProfileUpdateError({ errorState: false, errorMessage: null }), 6000);
                    })
                }>Remove</button>
                <button
                onClick={() => 
                    setForms({ 
                        ...forms, 
                        removeImage: false 
                    })
                }>Cancel</button>
            </div>
        </div>
    )
    
}

export default UploadImageForm;