import axios from "axios"
import { REGISTER_FAIL } from "../types/authType";
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
            console.log('response', response.data);
        } catch (error) {
            console.log(error.response.data);

            // 分发（请求失败的） action 到 reducer 中 @kofeine 022223
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}