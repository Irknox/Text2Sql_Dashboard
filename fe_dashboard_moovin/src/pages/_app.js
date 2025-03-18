import { Provider } from 'react-redux';
import { store } from '../redux/store/index';
import '../styles/Dashboard.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;