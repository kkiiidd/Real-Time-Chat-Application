import axios from "axios";
import { GET_FRIENDS_SUCCESS, GET_MESSAGE_SUCCESS, REMOVE_UNSEEN, SEND_MESSAGE_SUCCESS, UPDATE_MESSAGE, UPDATE_UNSEEN } from "../types/messengerTypes";

export const getFriends = async (dispatch) => {
    console.log('get Friends')
    try {
        const response = await axios.get('/api/chatapp/get-friends');
        console.log('get friend response', response.data)
        dispatch({
            type: GET_FRIENDS_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })
    } catch (error) {
        console.log(error.response.data);
    }
}

export const sendMessage = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('api/chatapp/send-message', data);
            // console.log('sendMessage data', data);
            // console.log(response);
            dispatch({
                type: SEND_MESSAGE_SUCCESS,
                payload: {
                    newMessage: response.data.message
                }
            })

        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const getMessage = (currentFriendId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/chatapp/get-message/' + currentFriendId);
            console.log(response.data);
            dispatch({
                type: GET_MESSAGE_SUCCESS,
                payload: {
                    messages: response.data.messages
                }
            })

        } catch (error) {
            console.log(error.response.data)
        }

    }
}
export const sendImage = (formData) => {
    return async (dispatch) => {
        // console.log(formData.get('senderName'));
        // console.log(formData.get('recieverId'));
        // console.log(formData.get('image'));
        // console.log(formData.get('imageName'));
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        try {
            console.log(formData);
            const response = await axios.post("/api/chatapp/send-image", formData, config);
            console.log(response.data);
            dispatch({
                type: SEND_MESSAGE_SUCCESS,
                payload: {
                    newMessage: response.data.message
                }
            })

        } catch (error) {
            console.log(error.response.data);
        }
    }
}
export const seenAllCurrentFriendMessages = (friendId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/chatapp/seen-all/' + friendId);
            console.log('seen all response', response.data);
            dispatch({
                type: REMOVE_UNSEEN,
                payload: {
                    friendId,
                    sentMsg: response.data.unseenMessages
                }
            })
        } catch (error) {
            console.log('seen all error:', error)
        }
    }
}

export const themeSet = (value) => {
    return (dispatch) => {

    }
}