import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import StoreFetchError from './StoreFetchError';
import { GOOGLE_MAPS_API_KEY as KEY } from '../../env';
import fetchStoresData from '../../helper/stores/fetchStoresData';

import style from '../../styles/Stores.module.sass';

const GoogleMaps = ({ center, storeLocations, setStoreLocations }) => {

    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [error, setError] = useState(false);

    const toggleInfoBox = (infoWindowOpen) => setInfoWindowOpen(!infoWindowOpen);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: KEY
    })

    useEffect(() => {
        if ( storeLocations === null )
            fetchStoresData()
            .then(stores => setStoreLocations(stores))
            .catch(e => setError(true))
    }, [storeLocations, isLoaded, error]);

    return (
        <div 
        className={style.googleMapsContainer}
        id='googleMapsContainer'
        >
            <StoreFetchError>
            {
                isLoaded
                ? (
                    <GoogleMap
                    mapContainerClassName='selfGoogleMaps'
                    mapContainerStyle={{
                        height: '100%',
                        width: '100%'
                    }}
                    
                    center={{ lat: center.lat, lng: center.lng }}
                    zoom={center.zoom}
                    >
                        {
                            storeLocations && storeLocations.map(({ name, description, lat, lng }, index) => (
                                <Marker position={{ lat, lng }} key={index} onClick={() => toggleInfoBox(infoWindowOpen)}>
                                    { 
                                        infoWindowOpen
                                        ? (
                                            <InfoWindow>
                                                <div>
                                                    <p>{ name }</p>
                                                    <p>{ description }</p>
                                                </div>
                                            </InfoWindow>
                                        ) 
                                        : <></>
                                    }
                                </Marker>
                            ))
                        }
                    </GoogleMap>
                )
                : <></>
            }
            </StoreFetchError>
        </div>
    )
}

export default GoogleMaps;