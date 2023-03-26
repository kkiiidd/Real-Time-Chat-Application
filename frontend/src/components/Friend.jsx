import React from "react";
import moment from "moment";
const Friend = ({ friend, activeFriends }) => {
  console.log("friend:", friend);
  const msg = friend.lastMessage;
  // console.log("lastMessage", msg);
  // activeFriends.find((aF) => console.log(aF.userInfo));
  return (
    <>
      <div className="friend">
        <div className="friend-image">
          <div className="image">
            <img src={friend.info.image} alt="" />
            {activeFriends.find((aF) => aF.userInfo.id === friend.info._id) && (
              <div className="active_icon"></div>
            )}
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
            <div className="msg-message">
              {msg ? (
                <span>
                  {msg.senderId !== friend.info._id && "I:"}{" "}
                  {` ${msg.message.text || "[IMAGE]"}`}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="msg-time">
        {msg && (
          <span>
            {/* {
                  moment(msg.createdAt).format("YYYY MM DD") ===
                  moment().format("YYYY MM DD")
                    ? moment(msg.createdAt).format("HH:mm")
                    : moment(msg.createdAt).diff(moment(), "days") < 2
                    ? "Yesterday"
                    : moment(msg.createdAt).diff(moment(), "days") + "days ago"
                  // moment(msg.createdAt).format("HH:mm")
                } */}
            {moment(msg.createdAt).calendar(moment(), {
              sameDay: "HH:mm",
              nextDay: "[明天]",
              nextWeek: "dddd",
              lastDay: "[昨天] HH:mm",
              lastWeek: "YYYY-MM-DD HH:mm",
              sameElse: "YYYY-MM-DD HH:mm",
            })}
          </span>
        )}
      </div>
    </>
  );
};

export default Friend;
