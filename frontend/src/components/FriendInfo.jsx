import React from "react";
import { useState } from "react";
import { FaCaretSquareDown, FaEdit, FaSistrix } from "react-icons/fa";

const FriendInfo = ({ currentFriend, addFriend }) => {
  const [intro, setIntro] = useState("");
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={currentFriend.image} alt="" />
        </div>

        <div className="active-user">Active</div>

        <div className="name">
          <h4>{currentFriend.userName} </h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Coustomise Chat </h3>
          <FaCaretSquareDown />
        </div>

        <div className="privacy">
          <h3>Privacy and Support </h3>
          <FaCaretSquareDown />
        </div>

        <div className="media">
          <h3>Shared Media </h3>
          <label htmlFor="gallery">
            {" "}
            <FaCaretSquareDown />{" "}
          </label>
        </div>
      </div>

      <div className="gallery">
        <img src="/35315user.jpg" />
      </div>

      {addFriend && (
        <div>
          <div>
            <label htmlFor="introduction">Intoduction</label>
            <br />
            <input
              name="introduction"
              id="introduction"
              onChange={(e) => setIntro(e.target.value)}
            ></input>
          </div>
          <button onClick={() => addFriend(intro)}>Add Friend</button>
        </div>
      )}
    </div>
  );
};

export default FriendInfo;
