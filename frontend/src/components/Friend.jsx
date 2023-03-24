import React from "react";
import moment from "moment";
const Friend = ({ friend }) => {
  // console.log("friend:", friend);
  const msg = friend.lastMessage;
  // console.log("lastMessage", msg);
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={friend.info.image} alt="" />
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>
            {friend.info.userName}{" "}
            {friend.unseenMessages.length > 0 && (
              <span>unseen:{friend.unseenMessages.length}</span>
            )}
          </h4>
          <div className="msg-time">
            {msg ? (
              <span>
                {msg.senderId !== friend.info._id && "I:"}{" "}
                {` ${msg.message.text.slice(0, 10) || "[IMAGE]"}`}
              </span>
            ) : (
              ""
            )}
            {msg && (
              <span>{moment(msg.createdAt).startOf("mini").fromNow()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
