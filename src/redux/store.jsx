import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
})

const DataProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider