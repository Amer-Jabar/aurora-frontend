import Head from 'next/head';
import { useState } from 'react';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from 'react-icons/hi';

import MapsInfoBar from '../../components/Stores/MapsInfoBar'
import GoogleMaps from '../../components/Stores/GoogleMaps'
import Navbar from '../../components/Partials/Navbar';

import style from '../../styles/Stores.module.sass';
import { useEffect } from 'react';


const Stores = () => {

    const [storeLocations, setStoreLocations] = useState(null);
    const [center, setCenter] = useState({
        lat: 36.19,
        lng: 44.001,
        zoom: 10
    });
    const [mapsInfoBarIsOpen, setMapsInfoBarIsOpen] = useState(false);

    const MobileAccessor = () => (
        <div className={style.mobileAccessorContainer}
        id='mobileAccessorContainer'
        onClick={() => {
            if ( mapsInfoBarIsOpen ) {
                const mapsBar = document.querySelector('#mapsInfoBar');
                mapsBar.style.left = '-50%';
            } else {
                const mapsBar = document.querySelector('#mapsInfoBar');
                mapsBar.style.left = '0%';
            }
            
            setMapsInfoBarIsOpen(!mapsInfoBarIsOpen);
        }}>
            <span>
            {
                mapsInfoBarIsOpen
                ? <HiOutlineChevronDoubleRight />
                : <HiOutlineChevronDoubleLeft />
            }
            </span>
        </div>
    )

    useEffect(() => {}, [mapsInfoBarIsOpen]);

    return (
        <main className={style.storePageContainer}>
            <Head>
                <title>Aurora Stores</title>
                <meta 
                name='description' 
                content='Aurora E-Commerce websites store page. You can find nearest marketplace.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Navbar></Navbar>
            <section id='mapsContainer'>
                <MapsInfoBar
                storeLocations={storeLocations}
                setCenter={setCenter}
                ></MapsInfoBar>
                <GoogleMaps
                center={center}
                storeLocations={storeLocations}
                setStoreLocations={setStoreLocations}
                ></GoogleMaps>
                <MobileAccessor />
            </section>

        </main>
    )

}

export default Stores;