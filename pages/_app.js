import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../redux/store';

import PageRoutedLoading from '../components/Partials/PageRoutedLoading';

import '../styles/globals.css'


const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
        <Head>
            <link rel='shortcut icon' href='/image/favicon.ico' />
        </Head>
            <PageRoutedLoading>
                <Component {...pageProps}/>
            </PageRoutedLoading>
        </Provider>
    )
}

export default MyApp;