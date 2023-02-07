import axios from "axios"
export const userRegister = () => {
    return async (dispatch) => {
        // 请求配置 @kofeine 2023/02/07 22:26
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            // 使用axios发送请求,传入参数-表单数据，和参数-请求配置 @kofeine 2023/02/07 23:54
            const response = await axios.post('/api/register');
            console.log(response.data);
        } catch (error) {

        }
    }
}