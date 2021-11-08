import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { Links } from '../Navbar';

import style from '../../../styles/Partials/Navbar.module.sass';


const setSectionStyle = (hamburgerIsOpen, { current: sectionRef }, path) => {

    if ( hamburgerIsOpen ) {
        setPrefMargin({ current: sectionRef }, path);
        sectionRef.style.height = '55%';
        sectionRef.style.padding = '1em';
    } else {
        sectionRef.style.height = '0em';
        sectionRef.style.padding = '0em';
    }
}

const setPrefMargin = ({ current: sectionRef }, path) => {
    if ( path === '/Pages/Stores' )
        sectionRef.style.marginTop = `100px`;
    else {
        const prefMargin = document.querySelector('#navbar').clientHeight;
        sectionRef.style.marginTop = `${prefMargin}px`;    
    }
};

const ResponsiveSection = ({ hamburgerIsOpen, profilePath, router, loggedIn, userInfo, token, dispatcher, pageLoadingContext }) => {
    
    const { pathname } = useRouter();
    const sectionRef = useRef();
    useEffect(() => setSectionStyle(hamburgerIsOpen, sectionRef, pathname));
    useEffect(() => setPrefMargin(sectionRef, pathname), []);

    return (
        <div className={style.mobileResponsiveSection} ref={sectionRef}>
            <Links
            profilePath={profilePath}
            router={router}
            loggedIn={loggedIn}
            pageLoadingContext={pageLoadingContext}
            userInfo={userInfo}
            token={token}
            dispatcher={dispatcher}
            isInHamburger={true}
            ></Links>
        </div>
    )
}


export default ResponsiveSection;