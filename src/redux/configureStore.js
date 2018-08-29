import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState){
    const middewares = [
        thunk,
    ];
    return createStore(
        rootReducer,
        initialState, compose(
        applyMiddleware(...middewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f 
        )
    );
}
