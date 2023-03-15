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