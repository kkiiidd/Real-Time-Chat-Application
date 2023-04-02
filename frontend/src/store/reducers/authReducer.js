import { CLEAR_FAIL, CLEAR_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, TOKEN_INVALID, CLEAR_TOKEN_INVALID } from '../types/authType';
import { REGISTER_SUCCESS } from '../types/authType';
// import decodeToken from 'jwt-decode';
// 创建状态 @kofeine 022223
const authState = {
    loading: false,
    authenticated: false,
    error: '',
    successMessage: '',
    myInfo: '',
    tokenInvalid: []
}

// token 解码函数 @kofeine 031023
// const tokenDecode = (token) => {
//     const tokenDecoded = decodeToken(token);
//     const expDate = tokenDecode.exp * 1000;
//     if (new Date() > expDate)
//         return null
//     else return tokenDecoded;

// }
// 检查有没有 userInfo ，有则代表已经登录了 @kofeine 031023
let userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo) {
    // const getInfo = tokenDecode(getToken);
    console.log('userInfo', userInfo)

    authState.myInfo = userInfo;
    authState.loading = false;
    authState.authenticated = true;
    console.log('authReducer authState:', authState);
} else {
    console.log(window.location.pathname)
    if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        // 没有，且不在登录/注册页的话，则跳转至登录页面 @kofeine 040123
        window.location.href = "/login";

    }
}

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    switch (type) {
        case TOKEN_INVALID: {
            return {
                ...state,
                tokenInvalid: payload.error, //array,
                authenticated: false,
                loading: false

            }
        }
        case REGISTER_FAIL: return {
            ...state,
            loading: true,
            authenticated: false,
            error: payload.error,
            successMessage: ''
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false,
                authenticated: true,
                successMessage: payload.successMessage,
                myInfo: payload.userInfo,
                error: ''
            }
        }
        // 清除成功信息 @kofeine 031023
        case CLEAR_SUCCESS: {
            return {
                ...state,
                successMessage: ''
            }
        }
        // 清除失败信息 @kofeine 031023
        case CLEAR_FAIL: {
            return {
                ...state,
                error: ''
            }
        }
        case CLEAR_TOKEN_INVALID: {
            return {
                ...state,
                tokenInvalid: ''
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                successMessage: payload.successMessage,
                error: '',
                authenticated: true,
                loading: false,
                myInfo: payload.userInfo
            }
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                myInfo: '',
                authenticated: false,
                loading: false,
                successMessage: '',
                error: payload.error
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                myInfo: '',
                authenticated: false,
                loading: false,
                successMessage: 'logout success',
                error: ''
            }
        }
    }


    return state;
}
