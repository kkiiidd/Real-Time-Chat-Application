import React from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friend from "./Friend";
const Messenger = () => {
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src="/10531user.jpg" width="500px" alt="" />
                </div>
                <div className="name">
                  <h3>Hayes </h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  {" "}
                  <FaSistrix />{" "}
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
              <ActiveFriends />
            </div>
            <div className="friends">
              <div className="hover-friend ">
                <Friend />
              </div>
              <div className="hover-friend active">
                <Friend />
              </div>
              <div className="hover-friend ">
                <Friend />
              </div>
              <div className="hover-friend ">
                <Friend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Messenger;
