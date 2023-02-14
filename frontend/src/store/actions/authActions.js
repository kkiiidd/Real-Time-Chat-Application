import axios from "axios"
export const userRegister = (data) => {
    return async () => {
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
        }
    }
}