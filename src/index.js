import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import configureStore from './redux/configureStore';
import { fetchAllProducts } from './redux/actions/productActions';

const store = configureStore();
store.dispatch(fetchAllProducts());

const app = <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>;

ReactDOM.render(app, document.getElementById('root'));
