import { GET_FRIENDS_SUCCESS } from "../types/messengerTypes";

const messengerState = {
    friends: []
};

const messengerReducer = (state = messengerState, action) => {
    const { type, payload } = action;
    if (type === GET_FRIENDS_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }
    return state;
};
export default messengerReducer;