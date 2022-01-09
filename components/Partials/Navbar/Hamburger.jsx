import { useRef } from 'react';

import style from '../../../styles/Partials/Navbar.module.sass';


const updateHamburgerState = (hamburgerIsOpen, setHamburgerIsOpen, { current: hamburgerElement }) => {
    const hamburgerSpans = hamburgerElement.childNodes;
    if ( !hamburgerIsOpen ) {
        hamburgerElement.style.justifyContent = 'flex-start';

        hamburgerSpans[0].style.marginLeft = '8px';
        hamburgerSpans[0].style.transform = 'rotateZ(45deg)';
        hamburgerSpans[0].style.position = 'absolute';
        hamburgerSpans[1].style.display = 'none';
        hamburgerSpans[2].style.marginLeft = '-8px';
        hamburgerSpans[2].style.transform = 'rotateZ(-45deg)';
        hamburgerSpans[2].style.position = 'absolute';
    } else {
        hamburgerElement.style.justifyContent = 'space-evenly';
        
        hamburgerSpans[0].style.marginLeft = '0px';
        hamburgerSpans[0].style.transform = 'rotateZ(0deg)';
        hamburgerSpans[0].style.position = 'relative';
        hamburgerSpans[2].style.marginLeft = '0px';
        hamburgerSpans[2].style.transform = 'rotateZ(0deg)';
        hamburgerSpans[2].style.position = 'relative';
        setTimeout(() => {
            hamburgerSpans[1].style.display = 'block';
        }, 200);
    }

    setHamburgerIsOpen(!hamburgerIsOpen);
}

const Hamburger = ({ hamburgerIsOpen, setHamburgerIsOpen }) => {
    const hamburgerRef = useRef();

    return (
        <div 
        className={style.hamburger}
        ref={hamburgerRef}
        onClick={() => updateHamburgerState(hamburgerIsOpen, setHamburgerIsOpen, hamburgerRef)}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}


export default Hamburger;