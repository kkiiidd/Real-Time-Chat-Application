import React from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Message from "./Message";
import MessageSend from "./MessageSend";
import FriendInfo from "./FriendInfo";
import { useSelector } from "react-redux";

const RightSide = ({
  currentFriend,
  inputHandle,
  currentInput,
  sendMessage,
  scrollRef,
  emojiHandle,
  messageHandle,
  typeStatus,
}) => {
  const { messages } = useSelector((state) => state.messenger);
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={currentFriend.image} alt="" />
                    <div className="active-icon"></div>
                  </div>
                  <div className="name">
                    {!typeStatus ? (
                      <h3>{currentFriend.userName}</h3>
                    ) : (
                      <h3>Typing</h3>
                    )}
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      {" "}
                      <FaRocketchat />{" "}
                    </label>
                  </div>
                </div>
              </div>

              <Message
                messages={messages}
                currentFriend={currentFriend}
                scrollRef={scrollRef}
              />

              <MessageSend
                inputHandle={inputHandle}
                currentInput={currentInput}
                sendMessage={sendMessage}
                emojiHandle={emojiHandle}
                messageHandle={messageHandle}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo currentFriend={currentFriend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
