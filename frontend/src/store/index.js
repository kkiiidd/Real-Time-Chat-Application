// 搭建仓库

import { legacy_createStore as createStore,compose,applyMiddleware,combineReducers } from "redux";
import thunkMiddleWare from "redux-thunk";



const rootReducer = combineReducers({


})

const middleWare = [thunkMiddleWare];

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;