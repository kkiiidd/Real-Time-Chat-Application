import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { FaRegCheckCircle, FaMinus, FaCheck } from "react-icons/fa";

const Message = ({ messages, currentFriend, scrollRef }) => {
  const { myInfo } = useSelector((state) => state.auth);
  // console.log("current Friend", currentFriend);
  // console.log(message); --> {message:{...}}
  // console.log(messages);
  return (
    <>
      <div className="message-show">
        {messages && messages.length > 0
          ? messages.map((message) =>
              myInfo.id === message.senderId ? (
                <div className="my-message" ref={scrollRef}>
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">
                        {message.message.text}
                        {message.message.image ? (
                          <img src={"/image/" + message.message.image} />
                        ) : (
                          ""
                        )}
                      </p>
                      {/* 已读图标 */}

                      {message.status ? (
                        <>
                          {/* <img
                            className="img"
                            src={currentFriend.image}
                            alt=""
                          /> */}

                          <span>
                            <FaCheck color={"lightgrey"} />{" "}
                          </span>
                        </>
                      ) : (
                        <span>
                          <FaMinus />{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="time">
                    {moment(message.createdAt).calendar(moment(), {
                      sameDay: "HH:mm",
                      nextDay: "[明天]",
                      nextWeek: "dddd",
                      lastDay: "[昨天] HH:mm",
                      lastWeek: "YYYY-MM-DD HH:mm",
                      sameElse: "YYYY-MM-DD HH:mm",
                    })}
                  </div>
                </div>
              ) : (
                <div className="fd-message" scrollRef={scrollRef}>
                  <div className="image-message-time">
                    <img src={currentFriend.image} alt="" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text">
                          {message.message.text}
                          {message.message.image ? (
                            <img src={"/image/" + message.message.image} />
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                      <div className="time">
                        {moment(message.createdAt).calendar(moment(), {
                          sameDay: "HH:mm",
                          nextDay: "[明天]",
                          nextWeek: "dddd",
                          lastDay: "[昨天] HH:mm",
                          lastWeek: "YYYY-MM-DD HH:mm",
                          sameElse: "YYYY-MM-DD HH:mm",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
    </>
  );
};

export default Message;
