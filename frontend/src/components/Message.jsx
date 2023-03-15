import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { FaRegCheckCircle } from "react-icons/fa";

const Message = () => {
  return (
    <>
      <div className="message-show">
        <div className="my-message">
          <div className="image-message">
            <div className="my-text">
              <p className="message-text">
                how are you?
                <img src="/10531user.jpg" />
              </p>

              <img className="img" src="16562user.jpg" alt="" />

              <span>
                <FaRegCheckCircle />{" "}
              </span>
            </div>
          </div>
          <div className="time">2023-03-14</div>
        </div>
        <div className="fd-message">
          <div className="image-message-time">
            <img src="/16562user.jpg" alt="" />
            <div className="message-time">
              <div className="fd-text">
                <p className="message-text">
                  <img src="10531user.jpg" />
                </p>
              </div>
              <div className="time">time</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
