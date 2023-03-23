import { GET_FRIENDS_SUCCESS, GET_MESSAGE_SUCCESS, SEND_MESSAGE_SUCCESS, SOCKET_MESSAGE } from "../types/messengerTypes";

const messengerState = {
    friends: [],
    messages: [],
    sendSuccess: false
};

const messengerReducer = (state = messengerState, action) => {
    const { type, payload } = action;
    if (type === GET_FRIENDS_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }
    if (type === GET_MESSAGE_SUCCESS) {
        return {
            ...state,
            messages: payload.messages
        }
    }
    if (type === SEND_MESSAGE_SUCCESS) {
        return {
            ...state,
            sendSuccess: true,
            messages: [...state.messages, payload.newMessage]
        }
    }
    if (type === SOCKET_MESSAGE) {
        return {
            ...state,
            messages: [...state.messages, payload.message]
        }
    }
    if (type === "RESET_SENDSUCCESS") {
        return {
            ...state,
            sendSuccess: false
        }
    }
    return state;

};
export default messengerReducer;