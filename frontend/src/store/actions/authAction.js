// import axios from "axios"
import { axios } from "../../api/request"
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authType";
export const userRegister = (data) => {

    return async (dispatch) => {
        // 请求配置 @kofeine 2023/02/07 22:26
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        try {
            // 使用 axios 发送请求,传入参数-表单数据，和参数-请求配置 @kofeine 2023/02/07 23:54
            const response = await axios.post('/api/chatapp/user-register', data, config);
            // console.log('response', response.data);
            // 请求成功，将获取到的 token 放入本地存储中 @kofeine 022623
            localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
            // 分发成功的 reducer  @kofeine 022623
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {
            console.log(error.response.data);

            // 分发（请求失败的）reducer @kofeine 022223
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}
// 登录 action @kofeine 031223
export const userLogin = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {

            const response = await axios.post('/api/chatapp/user-login', data, config);
            localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
            // console.log(JSON.stringify(response.data.userInfo))
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    userInfo: response.data.userInfo
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })

        }
    }
}
// 获取个人信息 @kofeine 033123
export const userInfo = async (dispatch) => {
    try {
        const response = await axios.get('/api/chat-app/user-info');
        console.log('gettng user info !!!!!!!!!!!!!!!!!!!!!', response.data);
    } catch (error) {

        console.log('gettng user info !!!!!!!!!!!!!!!!!!!!!', error.response.data);
    }
}
export const userLogout = async (dispatch) => {
    try {
        const response = await axios.post('/api/chatapp/user-logout');
        console.log(response.data);
        if (response.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            })
            localStorage.removeItem('authToken');
        }
    } catch (error) {
        console.log(error.response.data);
    }
}