import { GET_FRIENDS_SUCCESS, GET_MESSAGE_SUCCESS, REMOVE_UNSEEN, RESET_SENDSUCCESS, SEND_MESSAGE_SUCCESS, SET_READ, SOCKET_MESSAGE, UPDATE_MESSAGE, UPDATE_UNSEEN } from "../types/messengerTypes";

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
    return state;

};
export default messengerReducer;