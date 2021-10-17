import { useState, useEffect, useContext } from 'react';
import { IoIosStar } from 'react-icons/io'

import { ProfileErrorContext } from '../ProfileContainer';
import updateDescriptiveProcess from '../../../../helper/auth/profile/forms/updateDescriptiveProcess';
import { descriptiveTable, GetDescriptiveType } from '../../../../helper/auth/profile/forms/GetDescriptiveType';
import getErrorMessage from '../../../../helper/auth/profile/profileContainer/profileErrors/getErrorMessages';

import style from '../../../../styles/Profile.module.sass';


const DescriptiveForm = ({ props, forms, setForms, descriptiveIndex, setUserDataFetched }) => {
    const [value, setValue] = useState(null);
    const setProfileUpdateError = useContext(ProfileErrorContext || '')?.errorSetter;

    const title = descriptiveTable[descriptiveIndex];
    const property = GetDescriptiveType(props, descriptiveIndex);

    useEffect(() => {
        if ( property )
            setValue(property);
    }, []);

    return (
        <div className={style.profileDescriptiveFormContainer}>
            <p>Update { title } { <IoIosStar /> }</p>
            <input type='text' 
            value={ value ? value : '' }
            placeholder={`Please enter ${title}`}
            onChange={({ target }) => setValue(target.value)} />
            <div className={style.formButtonContainer}>
                <button
                onClick={() =>
                    updateDescriptiveProcess(value, title, props)
                    .then(() => setForms({ ...forms, descriptive: false }))
                    .then(() => setUserDataFetched(null))
                    .catch(({ message }) => {
                        const errorMessage = getErrorMessage(message);
                        setProfileUpdateError({ errorState: true, errorMessage });
                        setTimeout(() => setProfileUpdateError({ errorState: false, errorMessage: null }), 6000);
                    })
                }>Update</button>
                <button
                onClick={() => 
                    setForms({ 
                        ...forms, 
                        descriptive: false 
                    })
                }>Close</button>
            </div>
        </div>
    )
    
}

export default DescriptiveForm;