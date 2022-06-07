import Layout from '../components/Layout/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/solid.css';
import '../node_modules/@fortawesome/fontawesome-free/css/brands.css';
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Layout>
    );
}

export default MyApp;
