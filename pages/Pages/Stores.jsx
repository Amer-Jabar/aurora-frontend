import Head from 'next/head';
import { useState, useEffect } from 'react';

import MapsInfoBar from '../../components/Stores/MapsInfoBar'
import GoogleMaps from '../../components/Stores/GoogleMaps'
import Navbar from '../../components/Partials/Navbar';
import setHeightFull from '../../helper/stores/setHeightFull';

import style from '../../styles/Stores.module.sass';


const Stores = () => {

    const [storeLocations, setStoreLocations] = useState(null);
    const [center, setCenter] = useState({
        lat: 36.19,
        lng: 44.001,
        zoom: 10
    });

    useEffect(() => {
        setHeightFull();
    }, [storeLocations]);

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
            </section>

        </main>
    )

}

export default Stores;