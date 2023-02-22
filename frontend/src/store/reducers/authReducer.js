import { REGISTER_FAIL } from '../types/authType';

// 创建状态 @kofeine 022223
const authState = {
    loading: false,
    authenticated: false,
    error: '',
    successMessage: '',
    myInfo: ''
}


const authRegister = (state = authState, action) => {
    const { payload, type } = action;
    switch (type) {
        case REGISTER_FAIL: return {
            ...state,
            loading: true,
            authenticated: false,
            error: '',
            successMessage: ''
        }
    }
    return state;
}