const setShowableNavbar = (formExists) => {
    const body = document.querySelector('body');
    const navbar = document.querySelector('#navbar');
    const profileBackgroundBlurEffect = document.querySelector('#profileBackgroundBlurEffect');

    body.onmousemove = ({ clientY }) => {

        if ( clientY < 90 ) {
            navbar.style.setProperty('top', '1em', 'important');
            profileBackgroundBlurEffect.style.setProperty('backdrop-filter', 'blur(5px)');
        } else {
            navbar.style.setProperty('top', '-6em', 'important');
            if ( !formExists )
                profileBackgroundBlurEffect.style.setProperty('backdrop-filter', 'blur(0px)');
        }
    }

}

export default setShowableNavbar;