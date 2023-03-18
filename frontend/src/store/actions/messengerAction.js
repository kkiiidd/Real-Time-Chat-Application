import axios from "axios";
import { GET_FRIENDS_SUCCESS } from "../types/messengerTypes";

export const getFriends = async (dispatch) => {
    console.log('get Friends')
    try {
        const response = await axios.get('/api/chatapp/get-friends');
        dispatch({
            type: GET_FRIENDS_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })
    } catch (error) {

    }
}

export const sendMessage = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('api/chatapp/send-message', data);
            // console.log('sendMessage data', data);
            // console.log(response);

        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const getMessage = (currentFriendId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/chatapp/get-message' + currentFriendId);
            console.log(response.data);

        } catch (error) {
            console.log(error.response.data)
        }

    }
}