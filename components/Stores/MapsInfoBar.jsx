import { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

import style from '../../styles/Stores.module.sass';


const setAllLabelsFit = (element) => {

    const allLabels = document.querySelectorAll('#mapStoreLocation');
    allLabels.forEach(label => label.style.setProperty('border', 'none'));
    allLabels.forEach(label => label.style.setProperty('height', '0px'));
    allLabels.forEach(label => label.style.setProperty('padding', '0em'));

    element.style.setProperty('height', 'max-content', 'important');
    element.style.setProperty('padding', '0.5em 4em', 'important');
    element.style.setProperty('border', '1px solid #465567', 'important');
}

const setFittedInfoBar = () => {
    const mapsInfoBar = document.querySelector('#mapsInfoBar');
    mapsInfoBar.style.setProperty('height', '15vh');
}

const setShowableNavbar = () => {

    if ( innerWidth > 768 )
        return;

    const navbar = document.querySelector('#navbar');
    const body = document.querySelector('body');
    navbar.style.borderRadius = '5em';
    navbar.style.marginInline = '5%';
    navbar.style.width = '90%';
    navbar.style.setProperty('display', 'flex', 'important');
    navbar.style.top = '-8em';
 
    body.onmousemove = ({ clientY }) => {
        if ( clientY <= 90 ) 
            navbar.style.top = '1em';
        else
            navbar.style.top = '-8em';
    }
}

const MapsInfoBar = ({ storeLocations, setCenter }) => {
    
    const [currentStore, setCurrentStore] = useState(-1);
    const currentStoreStyle = {
        borderRadius: '2em',
        color: 'rgb(221 236 255)',
        backgroundColor: '#2b323a'
    }

    useEffect(() => {
        setShowableNavbar();
        window.onresize = () => setShowableNavbar();
    }, [storeLocations])

    return (
        <div 
        className={style.mapsInfoBarContainer} 
        id='mapsInfoBar'
        >
            <div className={style.mapsInfoLabels}>
                <div className={style.mapsInfoLabelContainer}>
                    <div className={style.mapsInfoLabelHeader}>
                        <IoLocationOutline />
                        <p>Store Locations</p>
                    </div>
                    <div className={style.mapsLocationLabels} id='locationLabelContainer'>
                        {
                            storeLocations && storeLocations.map(({ name, lat, lng }, index) => (
                                <p 
                                className={style.mapsLocationLabelElement}
                                id='mapStoreLocation'
                                key={index}
                                style={ currentStore === index ? currentStoreStyle : {} }
                                title={ currentStore === index ? String(true) : String(false) }
                                onClick={({ target }) => {
                                    setCenter({ lat, lng, zoom: 13 });
                                    setCurrentStore(index);
                                    setAllLabelsFit(target);
                                    setFittedInfoBar();
                                }}
                                >{ name }</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapsInfoBar;