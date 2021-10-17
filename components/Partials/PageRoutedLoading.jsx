import { Fragment, useState, createContext } from 'react';
import { useRouter } from 'next/router';

import ProcessLoadingSpinner from './ProcessLoadingSpinner';
import { useEffect } from 'react';


export const LoadingContext = createContext({ setLoading: () => {} });

const PageRoutedLoading = ({ children }) => {

    const [pageLoading, setPageLoading] = useState(false);
    const { pathname, isReady } = useRouter();

    useEffect(() => {
        if ( isReady )
            setPageLoading(false);
    }, [pathname]);

    return (
        <Fragment>
            <LoadingContext.Provider value={{ setLoading: setPageLoading }}>
                <ProcessLoadingSpinner loading={pageLoading} fillScreen={true}></ProcessLoadingSpinner>
                {{ ...children }}
            </LoadingContext.Provider>
        </Fragment>
    )
}

export default PageRoutedLoading;