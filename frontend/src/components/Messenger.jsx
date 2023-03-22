import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friend from "./Friend";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  getMessage,
  sendImage,
  sendMessage,
} from "../store/actions/messengerAction";
import { useRef } from "react";

// 引入 socketio @kofeine 032023
import { io } from "socket.io-client";
import { userLogout } from "../store/actions/authAction";
import { SOCKET_MESSAGE, SOCKET_TYPING } from "../store/types/messengerTypes";

const Messenger = () => {
  const dispatch = useDispatch();

  // 当前选中的朋友 @kofeine 031723
  const [currentFriend, setCurrentFriend] = useState("");
  // 当前输入的信息 @kofeine 031723
  const [currentInput, setCurrentInput] = useState("");

  // 获取在线好友 @kofeine 032123
  const [activeFriends, setActiveFriends] = useState([]);

  // Socket 信息 @kofeine 032223
  const [socketMessage, setSocketMessage] = useState("");
  // Socket 输入状态 @kofeine 032223
  const [socketTyping, setSocketTyping] = useState(false);
  // 从 redux 中获取 reducer 中 state 的内容 @kofeine 031723
  const { friends, messages } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  // 滚动 @kofeine 031923
  const scrollRef = useRef();

  // 定义socket ref @kofeine 032023

  const socket = useRef();
  const [hide, setHide] = useState(true);

  // 计时器 @kofeine 032223
  let interval;
  const handleSend = () => {
    // console.log(currentInput);
    const data = {
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      message: currentInput,
    };
    dispatch(sendMessage(data));
    socket.current.emit("sendMessage", {
      senderId: myInfo.id,
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      createAt: new Date(),
      message: {
        text: currentInput,
        image: "",
      },
    });
    clearInterval(interval);
    socket.current.emit("stopTyping", {
      recieverId: currentFriend._id,
      senderId: myInfo.id,
      typeStatus: false,
    });
  };
  const inputHandle = (e) => {
    setCurrentInput(e.target.value);
    console.log(e.target);
    socket.current.emit("isTyping", {
      senderId: myInfo.id,
      recieverId: currentFriend._id,
      typeStatus: true,
    });
    // e.target.addEventListener("keyup", () => {
    //   interval = setInterval(() => {
    //     // console.log("input end after 3 seconds");
    //     // 停止输入3秒后，视为停止输入，发信号不显示 @kofeine 032223
    //     socket.current.emit("stopTyping", {
    //       recieverId: currentFriend._id,
    //       senderId: myInfo.id,
    //       typeStatus: false,
    //     });
    //   }, 3000);
    // });
    // e.target.addEventListener("input", () => {
    //   clearInterval(interval);
    // });
  };
  const emojiHandle = (emoji) => {
    console.log(emoji);
    setCurrentInput(`${currentInput}${emoji}`);
  };
  // 发送图片处理函数 @kofeine 032023
  const messageHandle = (e) => {
    console.log(e.target.files[0]);
    const newFileName = Date.now() + e.target.files[0].name;
    const formData = new FormData();
    formData.append("senderName", myInfo.userName);
    formData.append("recieverId", currentFriend._id);
    formData.append("image", e.target.files[0]);
    formData.append("imageName", newFileName);
    dispatch(sendImage(formData));
  };

  const logout = () => {
    dispatch(userLogout);
  };

  // 建立 socket 连接 @kofeine 032023
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    // 监听新信息 @kofeine 032223
    socket.current.on("getMessage", (data) => {
      console.log("socket get message", data);
      setSocketMessage(data);
    });
    socket.current.on("youAreTyping", (data) => {
      clearInterval(interval);
      setSocketTyping(data.typeStatus);
      interval = setInterval(() => {
        setSocketTyping(false);
      }, 3000);
    });
    // socket.current.on("youStopTyping", (data) => {
    //   setSocketTyping(data.typeStatus);
    // });
  }, []);

  // 加入聊天室 @kofeine 032123
  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  // 获取在线好友 @kofeine 032123
  useEffect(() => {
    socket.current.on("getUser", (users) => {
      console.log(users);
      setActiveFriends(users);
    });
  }, []);

  // 有人退出，更新在线好友 @kofeine 032123
  useEffect(() => {
    socket.current.on("updateUser", (users) => {
      console.log(users);
      setActiveFriends(users);
    });
  }, []);
  // socket 广播的信息，修改 store 的数据 @kofeine 032223
  useEffect(() => {
    // 先判断发送人与接收人 @kofeine 032223
    const { senderId, recieverId } = socketMessage;
    if (senderId === currentFriend._id && recieverId === myInfo.id) {
      console.log(
        "sockemsg change",
        senderId,
        currentFriend._id,
        recieverId,
        myInfo.id
      );
      dispatch({
        type: SOCKET_MESSAGE,
        payload: {
          message: socketMessage,
        },
      });
    }
  }, [socketMessage]);

  // 获取朋友列表 @kofeine 032223
  useEffect(() => {
    dispatch(getFriends);
  }, []);

  useEffect(() => {
    if (!currentFriend && friends.length > 0) setCurrentFriend(friends[0]);
  }, [friends]);

  // 获取当前好友的信息，检测 currentFriend @kofeine 031823
  useEffect(() => {
    dispatch(getMessage(currentFriend._id));
  }, [currentFriend?._id]); // 有的话检测其 _id 值 @kofeine 031823

  // 检测信息，然后滚动 @kofeine 031923
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
                <div className="icon" onClick={() => setHide(!hide)}>
                  <FaEllipsisH />
                  <div className={hide ? "theme_logout" : "theme_logout show"}>
                    <h3>Dark Mode </h3>
                    <div className="on">
                      <label htmlFor="dark">ON</label>
                      <input
                        // onChange={(e) => dispatch(themeSet(e.target.value))}
                        type="radio"
                        value="dark"
                        name="theme"
                        id="dark"
                      />
                    </div>

                    <div className="of">
                      <label htmlFor="white">OFF</label>
                      <input
                        // onChange={(e) => dispatch(themeSet(e.target.value))}
                        type="radio"
                        value="white"
                        name="theme"
                        id="white"
                      />
                    </div>

                    <div onClick={logout} className="logout">
                      <FaSignOutAlt /> Logout
                    </div>
                  </div>
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
                {activeFriends.map(
                  (aFrd) =>
                    aFrd.userInfo.id !== myInfo.id && (
                      <ActiveFriends
                        user={aFrd}
                        onClick={() => {
                          const aFriend = friends.find(
                            (frd) => aFrd.userInfo.id === frd._id
                          );
                          // console.log(aFriend);
                          setCurrentFriend(aFriend);
                        }}
                      />
                    )
                )}
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
            messages={messages}
            currentFriend={currentFriend}
            currentInput={currentInput}
            inputHandle={inputHandle}
            sendMessage={handleSend}
            scrollRef={scrollRef}
            emojiHandle={emojiHandle}
            messageHandle={messageHandle}
            typeStatus={socketTyping}
          />
        ) : (
          "Please Select A Friend"
        )}
      </div>
    </div>
  );
};
export default Messenger;
