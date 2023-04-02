import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptAddFriend,
  addRequest,
  getAllRequest,
  getTargetUser,
} from "../store/actions/messengerAction";
import FriendInfo from "./FriendInfo";
import { useEffect } from "react";
import { useAlert } from "react-alert";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { CLEAR_SUCCES_ERROR } from "../store/types/messengerTypes";
// import SendIcon from "@mui/icons-material/Send";

export const AddFriend = ({ socket }) => {
  const alert = useAlert();
  const [targetEmail, setTargetEmail] = useState("");
  const dispatch = useDispatch();
  const {
    targetUser,
    requests,
    addError,
    addSuccess,
    acceptSuccess,
    acceptError,
  } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
  const searchUser = (email) => {
    dispatch(getTargetUser(email));
  };
  const addFriend = (intro) => {
    dispatch(addRequest(targetUser, myInfo, intro));
  };

  // 通过邀请 @kofeine 032723
  const acceptAdd = (reqId, myId, friendId) => {
    dispatch(acceptAddFriend(reqId, myId, friendId));
  };
  // 获取添加好友邀请信息  @kofeine 032723
  useEffect(() => {
    dispatch(getAllRequest(myInfo.id));
  }, []);

  useEffect(() => {
    // 添加好友邀请失败 @kofeine 032723
    if (addError) alert.error(addError.errorMessage);
    // 添加好友邀请成功 @kofeine 032723
    else if (addSuccess) {
      alert.success("Request Sent");

      socket.current.emit("addFriend", {
        request: requests.filter((r) => r.senderId === myInfo.id)[0],
      });
    } else if (acceptSuccess) {
      socket.current.emit("addFriendSuccess", {
        friendInfo: acceptSuccess,
        // {friendName,firendId} @kofeine 032823
      });
    }
    dispatch({
      type: CLEAR_SUCCES_ERROR,
    });
    // console.log(addError);
  }, [addError, addSuccess, acceptError, acceptSuccess]);
  // console.log("target user", targetUser);

  return (
    <div className="col-9">
      <div className="row">
        <div className="col-8">
          <div className="add-friend">
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setTargetEmail(e.target.value)}
              value={targetEmail}
            />
            <button onClick={() => searchUser(targetEmail)}>search</button>
          </div>
          <div className="requests-list">
            {/* {requests.length>0 ? requests.map(rq=><div className="request-item">
              <div className="image"><img src={rq.image} alt="" /></div>
              <div className="name">{rq.userName}</div>
            </div>)} */}

            <List
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  New Friend
                </ListSubheader>
              }
            >
              {requests.length > 0
                ? requests.map((rq) => (
                    <div className="request-item" key={rq._id}>
                      {rq.senderId !== myInfo.id ? (
                        <ListItemButton>
                          <ListItemIcon>
                            <Avatar alt="Remy Sharp" src={rq.senderImage} />
                          </ListItemIcon>
                          <ListItemText primary={rq.senderName} />
                          {rq.status === "pending" ? (
                            <Button
                              variant="contained"
                              onClick={() =>
                                acceptAdd(rq._id, rq.recieverId, rq.senderId)
                              }
                            >
                              Accept
                            </Button>
                          ) : (
                            <Button disabled>Added</Button>
                          )}
                        </ListItemButton>
                      ) : (
                        <ListItemButton>
                          <ListItemIcon>
                            <Avatar alt="Remy Sharp" src={rq.recieverImage} />
                          </ListItemIcon>
                          <ListItemText primary={rq.recieverName} />
                          {rq.status === "pending" ? (
                            <Button variant="contained" disabled>
                              Waiting
                            </Button>
                          ) : (
                            <Button disabled>Added</Button>
                          )}
                        </ListItemButton>
                        // <>
                        //   <img
                        //     src={rq.recieverImage}
                        //     width="100px"
                        //     height="100px"
                        //     alt=""
                        //   />
                        //   <span>{rq.recieverName}</span>
                        // </>
                      )}
                    </div>
                  ))
                : "Nothing Yet."}
            </List>
          </div>
        </div>
        <div className="col-4">
          {!targetUser.result ? (
            ""
          ) : targetUser.result === "found" ? (
            <FriendInfo currentFriend={targetUser.info} addFriend={addFriend} />
          ) : targetUser.result === "notfound" ? (
            "user not found"
          ) : (
            "Server Error"
          )}
        </div>
      </div>
    </div>
  );
};
