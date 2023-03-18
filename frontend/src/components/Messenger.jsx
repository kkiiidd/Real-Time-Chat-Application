import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friend from "./Friend";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, sendMessage } from "../store/actions/messengerAction";
const Messenger = () => {
  const dispatch = useDispatch();

  // 当前选中的朋友 @kofeine 031723
  const [currentFriend, setCurrentFriend] = useState("");
  // 当前输入的信息 @kofeine 031723
  const [currentInput, setCurrentInput] = useState("");

  // 从 redux 中获取 reducer 中 state 的内容 @kofeine 031723
  const { successMessage, friends } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  // 获取当前信息，检测 currentFriend @kofeine 031823
  useEffect(() => {}, [currentFriend?._id]); // 有的话检测其 _id 值 @kofeine 031823
  const inputHandle = (e) => {
    setCurrentInput(e.target.value);
  };
  const handleSend = () => {
    // console.log(currentInput);
    const data = {
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      message: currentInput,
    };
    dispatch(sendMessage(data));
  };
  useEffect(() => {
    dispatch(getFriends);
  }, []);
  useEffect(() => {
    if (!currentFriend && friends.length > 0) setCurrentFriend(friends[0]);
  }, [friends]);
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={myInfo.image} width="500px" alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
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
              <div className="scroll-friends">
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
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((frd) => (
                    <div
                      className={
                        currentFriend._id === frd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      onClick={() => setCurrentFriend(frd)}
                    >
                      <Friend friend={frd} key={frd._id} />
                    </div>
                  ))
                : "No Friends"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            currentInput={currentInput}
            inputHandle={inputHandle}
            sendMessage={handleSend}
          />
        ) : (
          "Please Select A Friend"
        )}
      </div>
    </div>
  );
};
export default Messenger;
