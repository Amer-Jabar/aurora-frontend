import { useEffect } from 'react';

import { formTable } from './Form/Forms';

import style from '../../../styles/Profile.module.sass';


const formExists = (forms) => ( Object.values(forms).includes(true) )

const Form = ({ props, forms, setForms, descriptiveIndex, setUserDataFetched }) => {
    
    const renderForm = formExists(forms);

    let UserForm = null;

    if ( renderForm ) {
        let formIndex = null;
        Object.values(forms).forEach((form, index) => form == true ? formIndex = index : null);
        UserForm = formTable[formIndex];
    }

    useEffect(() => {
        if ( renderForm ) {
            const body = document.querySelector('body');
            const backgroundBlurEffect = document.querySelector('#profileBackgroundBlurEffect');
            body.style.opacity = '0.8';
            backgroundBlurEffect.style.backdropFilter = 'blur(5px)';
            backgroundBlurEffect.style.pointerEvents = 'none';
    
            const innerContainer = document.querySelector('#profileInnerContainer');
            innerContainer.style.pointerEvents = 'none';

            return () => {
                body.style.opacity = '1';
                backgroundBlurEffect.style.backdropFilter = 'blur(0px)';
                innerContainer.style.pointerEvents = 'all';
            }
        }
    }, [renderForm]);

    return (
        renderForm
        ? (
            <div className={style.profileForm}>
                <UserForm
                props={props}
                forms={forms}
                setForms={setForms}
                descriptiveIndex={descriptiveIndex}
                setUserDataFetched={setUserDataFetched}
                ></UserForm>
            </div>
        )
        : <></>
    )
}

export default Form;