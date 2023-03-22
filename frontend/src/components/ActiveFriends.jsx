import React from "react";

const ActiveFriends = ({ user, onClick }) => {
  return (
    <div className="active-friend" onClick={onClick}>
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
