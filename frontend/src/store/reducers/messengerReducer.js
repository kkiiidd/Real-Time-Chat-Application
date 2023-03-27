import { ADD_REQUEST_FAIL, ADD_REQUEST_SUCCESS, GET_ALL_REQUESTS_SUCCESS, GET_FRIENDS_SUCCESS, GET_MESSAGE_SUCCESS, GET_THEME_SUCCESS, REMOVE_UNSEEN, RESET_SENDSUCCESS, SEARCH_FRIEND_ERROR, SEARCH_FRIEND_NOT_FOUND, SEARCH_FRIEND_SUCCESS, SEND_MESSAGE_SUCCESS, SET_READ, SET_THEME_SUCCESS, SOCKET_MESSAGE, UPDATE_MESSAGE, UPDATE_REQUESTS, UPDATE_UNSEEN } from "../types/messengerTypes";

const messengerState = {
    friends: [],
    messages: [],
    sendSuccess: false,
    theme: 'light',
    targetUser: {},
    requests: [],
    addError: '',
    addSuccess: ''
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
    if (type === UPDATE_MESSAGE) {
        const friendIndex = state.friends.findIndex(f => f.info._id === payload.sentMsg.senderId || f.info._id === payload.sentMsg.recieverId);
        // console.log('update !!!!!!!!!!!!!!! friend', state.friends[friendIndex]);
        state.friends[friendIndex].lastMessage = payload.sentMsg;
        return {
            ...state,

        }
    }
    if (type === UPDATE_UNSEEN) {
        const friendIndex = state.friends.findIndex(f => f.info._id === payload.sentMsg.senderId || f.info._id === payload.sentMsg.recieverId);
        state.friends[friendIndex].unseenMessages = [...(state.friends[friendIndex].unseenMessages), payload.sentMsg];
        return {
            ...state,

        }
    }
    if (type === REMOVE_UNSEEN) {
        const friendIndex = state.friends.findIndex(f => f.info._id === payload.friendId);
        state.friends[friendIndex].unseenMessages = payload.sentMsg;
        return {
            ...state,

        }
    }
    if (type === SET_READ) {
        state.messages.forEach((msg, index) => {
            if (msg.recieverId === payload.friendId) state.messages[index].status = true;
        })
        return {
            ...state,
            messages: state.messages

        }
    }

    if (type === RESET_SENDSUCCESS) {
        return {
            ...state,
            sendSuccess: false
        }
    }
    if (type === SEARCH_FRIEND_SUCCESS) {
        return {
            ...state,
            targetUser: { info: payload.targetUser, result: payload.msg }
        }
    }
    if (type === ADD_REQUEST_FAIL) {
        return {
            ...state,
            addError: payload.error,
            addSuccess: ''
        }
    }
    if (type === ADD_REQUEST_SUCCESS) {
        return {
            ...state,
            requests: [payload.request, ...state.requests],
            addError: '',
            addSuccess: 'Request Sent'
        }
    }
    if (type === GET_ALL_REQUESTS_SUCCESS) {
        return {
            ...state,
            requests: payload.allRequests
        }
    }
    if (type === UPDATE_REQUESTS) {
        return {
            ...state,
            requests: [payload.request, ...state.requests]
        }
    }
    if (type === SEARCH_FRIEND_NOT_FOUND || type === SEARCH_FRIEND_ERROR) {
        console.log(payload)
        return {
            ...state,
            targetUser: { info: {}, result: payload.msg }
        }
    }
    if (type === SET_THEME_SUCCESS || type === GET_THEME_SUCCESS) {
        return {
            ...state,
            theme: payload.theme
        }
    }
    return state;

};
export default messengerReducer;