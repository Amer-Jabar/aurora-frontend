import { useState, useEffect, useContext } from 'react';

import { ProfileErrorContext } from '../ProfileContainer';
import uploadImageProcess from '../../../../helper/auth/profile/forms/uploadImageProcess';
import getErrorMessage from '../../../../helper/auth/profile/profileContainer/profileErrors/getErrorMessages';

import style from '../../../../styles/Profile.module.sass';


const UploadImageForm = ({ props, forms, setForms, setUserDataFetched }) => {
    const { _id } = props;
    const [file, setFile] = useState(null);
    const setProfileUpdateError = useContext(ProfileErrorContext || '')?.errorSetter;

    useEffect(() => {}, []);

    return (
        <div className={style.profileDescriptiveFormContainer}>
            <p>Upload Picture</p>
            <input type='file' 
            onChange={({ target }) => setFile(target.files[0])} />
            <div className={style.formButtonContainer}>
                <button
                style={ !file 
                    ? { opacity: '0.7', pointerEvents: 'none' }
                    : { opacity: '1', pointerEvents: 'all' }
                }
                onClick={(e) =>
                    uploadImageProcess(e, file, _id)
                    .then(() => setForms({ ...forms, uploadImage: false }))
                    .then(() => setUserDataFetched(null))
                    .catch(({ message }) => {
                        const errorMessage = getErrorMessage(message);
                        setProfileUpdateError({ errorState: true, errorMessage })
                        setTimeout(() => setProfileUpdateError({ errorState: false, errorMessage: null }), 6000);
                    })
                }>Upload</button>
                <button
                onClick={() => 
                    setForms({ 
                        ...forms, 
                        uploadImage: false 
                    })
                }>Close</button>
            </div>
        </div>
    )
    
}

export default UploadImageForm;