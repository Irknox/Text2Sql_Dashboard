import { Provider } from 'react-redux';
import { store } from '../redux/store/index';
import '../styles/Dash_styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;