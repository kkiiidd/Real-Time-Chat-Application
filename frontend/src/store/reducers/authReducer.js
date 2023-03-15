import { CLEAR_FAIL, CLEAR_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL } from '../types/authType';
import { REGISTER_SUCCESS } from '../types/authType';
import decodeToken from 'jwt-decode';
// 创建状态 @kofeine 022223
const authState = {
    loading: false,
    authenticated: false,
    error: '',
    successMessage: '',
    myInfo: ''
}

// token 解码函数 @kofeine 031023
const tokenDecode = (token) => {
    const tokenDecoded = decodeToken(token);
    const expDate = tokenDecode.exp * 1000;
    if (new Date() > expDate)
        return null
    else return tokenDecoded;

}
// 检查有没有 token ，有则代表已经登录了 @kofeine 031023
let getToken = localStorage.getItem('authToken');
if (getToken) {
    const getInfo = tokenDecode(getToken);
    console.log('getInfo', getInfo)
    if (getInfo) {
        authState.myInfo = getInfo;
        authState.loading = false;
        authState.authenticated = true;
    }
    console.log('authReducer authState:', authState);
}

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    switch (type) {
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
                myInfo: tokenDecode(payload.token),
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
        case LOGIN_SUCCESS: {
            return {
                ...state,
                successMessage: payload.successMessage,
                error: '',
                authenticated: true,
                loading: false,
                myInfo: tokenDecode(payload.token)
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
    }


    return state;
}
