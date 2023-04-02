import axios from "axios";
import { TOKEN_INVALID } from "../store/types/authType";

export const setupAxiosInterceptors = dispatch => {

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.log('interceptor is working:', error.response.data);
        // alert(error.response.data.error.errorMessage[0]);
        dispatch({
            type: TOKEN_INVALID,
            payload: {
                error: error.response.data.error.errorMessage
            }
        })
        localStorage.removeItem('userInfo');
        // window.location.href = '/login';
        return Promise.reject(error);
    })
}
export { axios };
