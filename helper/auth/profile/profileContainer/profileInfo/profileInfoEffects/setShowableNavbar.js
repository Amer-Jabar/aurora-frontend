const setShowableNavbar = (formExists) => {
    const body = document.querySelector('body');
    const navbar = document.querySelector('#navbar');
    const profileBackgroundBlurEffect = document.querySelector('#profileBackgroundBlurEffect');
    const mobileResponsiveSection = document.querySelector('#mobileResponsiveSection');

    body.onmousemove = ({ clientY }) => {

        if ( clientY < 90 ) {
            navbar.style.setProperty('top', '1em', 'important');
            profileBackgroundBlurEffect.style.setProperty('backdrop-filter', 'blur(5px)');
            mobileResponsiveSection.style.opacity = 1;
        } else {
            navbar.style.setProperty('top', '-8em', 'important');
            mobileResponsiveSection.style.opacity = 0;
            if ( !formExists )
                profileBackgroundBlurEffect.style.setProperty('backdrop-filter', 'blur(0px)');
        }
    }

}

export default setShowableNavbar;