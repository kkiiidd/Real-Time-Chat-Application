// 搭建仓库

import { legacy_createStore as createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";



const rootReducer = combineReducers({


})

const middleware = [thunkMiddleware];

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;