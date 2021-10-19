import { useEffect, useState, useRef } from 'react';

import { Links } from '../Navbar';

import style from '../../../styles/Partials/Navbar.module.sass';


const setSectionStyle = (hamburgerIsOpen, { current: sectionRef }) => {

    if ( hamburgerIsOpen ) {
        setPrefMargin({ current: sectionRef });
        sectionRef.style.height = '50%';
        sectionRef.style.padding = '1em';
    } else {
        sectionRef.style.height = '0em';
        sectionRef.style.padding = '0em';
    }
}

const setPrefMargin = ({ current: sectionRef }) => {
    const prefMargin = document.querySelector('#navbar').clientHeight;
    sectionRef.style.marginTop = `${prefMargin}px`;
};

const ResponsiveSection = ({ hamburgerIsOpen, profilePath, loggedIn, userInfo, pageLoadingContext }) => {
    
    const sectionRef = useRef();
    useEffect(() => setSectionStyle(hamburgerIsOpen, sectionRef));
    useEffect(() => setPrefMargin(sectionRef), []);

    return (
        <div className={style.mobileResponsiveSection} ref={sectionRef}>
            <Links
            profilePath={profilePath}
            loggedIn={loggedIn}
            pageLoadingContext={pageLoadingContext}
            userInfo={userInfo}
            isInHamburger={true}
            ></Links>
        </div>
    )
}


export default ResponsiveSection;