import { Provider } from 'react-redux';
import store from '../redux/store';

import PageRoutedLoading from '../components/Partials/PageRoutedLoading';

import '../styles/globals.css'


const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <PageRoutedLoading>
                <Component {...pageProps}/>
            </PageRoutedLoading>
        </Provider>
    )
}

export default MyApp;