import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTargetUser } from "../store/actions/messengerAction";
import FriendInfo from "./FriendInfo";

export const AddFriend = () => {
  const [targetEmail, setTargetEmail] = useState("");
  const dispatch = useDispatch();
  const { targetUser } = useSelector((state) => state.messenger);
  const searchUser = (email) => {
    dispatch(getTargetUser(email));
  };
  const addFriend = () => {};
  console.log("target user", targetUser);
  return (
    <div className="col-9">
      <div className="add-friend">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setTargetEmail(e.target.value)}
          value={targetEmail}
        />
        <button onClick={() => searchUser(targetEmail)}>search</button>

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
        <div className="target-info"></div>
      </div>
    </div>
  );
};
