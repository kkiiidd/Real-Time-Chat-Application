import axios from "axios";
import { ADD_REQUEST_FAIL, ADD_REQUEST_SUCCESS, GET_ALL_REQUESTS_SUCCESS, GET_FRIENDS_SUCCESS, GET_MESSAGE_SUCCESS, GET_THEME_SUCCESS, REMOVE_UNSEEN, SEARCH_FRIEND_ERROR, SEARCH_FRIEND_NOT_FOUND, SEARCH_FRIEND_SUCCESS, SEND_MESSAGE_SUCCESS, SET_THEME_SUCCESS, UPDATE_MESSAGE, UPDATE_UNSEEN } from "../types/messengerTypes";

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
export const getTheme = (dispatch) => {
    const theme = localStorage.getItem('theme') || 'light';
    dispatch({
        type: GET_THEME_SUCCESS,
        payload: {
            theme
        }
    })
}
export const setTheme = (theme) => {
    return (dispatch) => {
        localStorage.setItem('theme', theme);
        console.log('set theme ', theme)
        dispatch({
            type: SET_THEME_SUCCESS,
            payload: {
                theme: localStorage.getItem('theme') || 'light'
            }
        })
    }
}

export const getTargetUser = (email) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/chatapp/get-target-user/' + email);
            // console.log('get target response', response.data);

            dispatch({
                type: SEARCH_FRIEND_SUCCESS,
                payload: {
                    targetUser: response.data.targetUser,
                    msg: 'found'
                }
            })

        } catch (error) {
            if (error.response.data.error.code === 400) {
                dispatch({
                    type: SEARCH_FRIEND_NOT_FOUND,
                    payload: {
                        msg: 'notfound'
                    }
                })
            } else {
                dispatch({
                    type: SEARCH_FRIEND_ERROR,
                    payload: {
                        msg: 'servererror'
                    }
                })

            }
            console.log('get target error', error.response.data.error);

        }

    }
}

export const addRequest = (targetUser, myInfo, intro) => {
    return async (dispatch) => {
        try {
            const data = {
                targetUser,
                myInfo,
                intro
            }
            console.log('data', data)
            const response = await axios.post('/api/chatapp/add-request', data);
            // console.log('add request response:', response.data); request
            dispatch({
                type: ADD_REQUEST_SUCCESS,
                payload: {
                    request: response.data.request
                }
            })

        } catch (error) {
            dispatch({
                type: ADD_REQUEST_FAIL,
                payload: {
                    error: error.response.data.error
                }
            })
            console.log('add request error:', error.response.data);

        }

    }
}
export const getAllRequest = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/chatapp/get-request/' + id);
            console.log('get request response:', response.data);
            if (response.data.allRequests.length > 0) {
                dispatch({
                    type: GET_ALL_REQUESTS_SUCCESS,
                    payload: {
                        allRequests: response.data.allRequests
                    }
                })
            }
        } catch (error) {

            console.log('add request error:', error.response.data);
        }
    }
}


export const acceptAddFriend = (reqId, myId, friendId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/chatapp/add-friend', {
                reqId, myId, friendId
            })
            console.log(response.data);
        } catch (error) {
            console.log('add request error:', error.response.data);
        }

    }
}
