import {combineReducers, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderBookReducer from "../features/orderbook/orderBookSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    orderBook: orderBookReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
