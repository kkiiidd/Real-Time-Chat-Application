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
    // 此处报错是因为浏览器没有安装 redux 开发者插件 @kofeine 022023
);

export default store;