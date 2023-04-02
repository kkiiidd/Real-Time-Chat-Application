import React from "react";

const ActiveFriends = ({ user, onClickFunc }) => {
  return (
    <div className="active-friend" onClick={onClickFunc}>
      <div className="image-active-icon">
        <div className="image">
          <img src={user.userInfo.image} alt="" />
          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriends;
