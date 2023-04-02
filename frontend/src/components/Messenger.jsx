import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friend from "./Friend";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  getMessage,
  getTheme,
  seenAllCurrentFriendMessages,
  sendImage,
  sendMessage,
  setTheme,
} from "../store/actions/messengerAction";
import { useRef } from "react";
// 引入 use-sound @kofeine 032323
import useSound from "use-sound";
// 引入吐司 @kofeine 032323
import toast, { Toaster } from "react-hot-toast";
// 引入音频 @kofeine 032323
import notificationSound from "../audio/audio_notification.mp3";
import sendSound from "../audio/audio_sending.mp3";

// 引入 socketio @kofeine 032023
import { io } from "socket.io-client";

import { userLogout } from "../store/actions/authAction";
import {
  RESET_SENDSUCCESS,
  SET_READ,
  SOCKET_MESSAGE,
  SOCKET_TYPING,
  UPDATE_MESSAGE,
  UPDATE_REQUESTS,
  UPDATE_REQUESTS_ACCEPT,
  UPDATE_UNSEEN,
} from "../store/types/messengerTypes";
import { AddFriend } from "./AddFriend";
import {
  Switch,
  Route,
  Routes,
  NavLink,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAlert } from "react-alert";
import { CLEAR_TOKEN_INVALID } from "../store/types/authType";
import { AddMoment } from "./AddMoment";
import { Moment } from "./Moment";

const Messenger = () => {
  const dispatch = useDispatch();
  const [notificationSPlay] = useSound(notificationSound);
  const [sendSPlay] = useSound(sendSound);
  // 当前选中的朋友 @kofeine 031723
  const [currentFriend, setCurrentFriend] = useState("");
  // 当前输入的信息 @kofeine 031723
  const [currentInput, setCurrentInput] = useState("");

  // 获取在线好友 @kofeine 032123
  const [activeFriends, setActiveFriends] = useState([]);
  // 当前好友输入状态 @kofeine 032323
  const [currentFriendTypeStatus, setCurrentFriendTypeStatus] = useState(false);
  // Socket 信息 @kofeine 032223
  const [socketMessage, setSocketMessage] = useState("");
  // Socket 输入状态 @kofeine 032223
  const [socketTyping, setSocketTyping] = useState(false);
  // socket 好友邀请状态 @kofeine 032723
  const [socketFriendAdd, setSocketFriendAdd] = useState("");
  const [socketFriendAdded, setSocketFriendAdded] = useState("");
  // 从 redux 中获取 reducer 中 state 的内容 @kofeine 031723
  const { friends, messages, sendSuccess, theme, requests } = useSelector(
    (state) => state.messenger
  );
  const { myInfo, tokenInvalid } = useSelector((state) => state.auth);

  // 通知 @kofeine 040123
  const alert = useAlert();
  // 滚动 @kofeine 031923
  const scrollRef = useRef();

  // 定义socket ref @kofeine 032023
  const socket = useRef();

  const [hide, setHide] = useState(true);

  // 计时器 @kofeine 032223
  const countdown = useRef();

  // 路由导航方法 @kofeine 040123
  const navigate = useNavigate();
  const handleSend = () => {
    // console.log(currentInput);
    const data = {
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      message: currentInput,
    };
    dispatch(sendMessage(data));
    // socket.current.emit("sendMessage", {
    //   senderId: myInfo.id,
    //   senderName: myInfo.userName,
    //   recieverId: currentFriend._id,
    //   createAt: new Date(),
    //   message: {
    //     text: currentInput,
    //     image: "",
    //   },
    // });
    clearTimeout(countdown.current);
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
  // 添加表情 @kofeine 032623
  const emojiHandle = (emoji) => {
    console.log(emoji);
    setCurrentInput(`${currentInput}${emoji}`);
    socket.current.emit("isTyping", {
      senderId: myInfo.id,
      recieverId: currentFriend._id,
      typeStatus: true,
    });
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

  // 搜索朋友 @kofeine 032623
  const searchFriend = (strContained) => {
    const friendNameList = document.querySelectorAll(
      ".friends .hover-friend .friend .friend-name-seen .friend-name h4"
    );
    const friendItems = document.querySelectorAll(".friends .hover-friend");
    friendNameList.forEach((friendName, index) => {
      console.log("friend name:", friendName.innerHTML);
      if (
        friendName.innerHTML.toLowerCase().indexOf(strContained.toLowerCase()) >
        -1
      ) {
        friendItems[index].style.display = "";
      } else {
        friendItems[index].style.display = "none";
      }
    });
  };
  const logout = () => {
    dispatch(userLogout);
  };
  useEffect(() => {
    navigate("/rightside");
  }, []);
  // token失效 @kofeine 040123
  useEffect(() => {
    console.log("token invalid", tokenInvalid);
    if (tokenInvalid.length > 0) {
      alert.error(tokenInvalid[0]);
      console.log("alert !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      socket.current.close();
      dispatch({
        type: CLEAR_TOKEN_INVALID,
      });
      navigate("/login");
    }
  }, [tokenInvalid]);
  // 建立 socket 连接 @kofeine 032023
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    // 监听新信息 @kofeine 032223
    socket.current.on("getMessage", (data) => {
      // console.log("socket get message", data);

      setSocketMessage(data);
    });
    // 好友正在输入 @kofeine 040123
    socket.current.on("youAreTyping", (data) => {
      // console.log("data", data, currentFriend, myInfo.id);
      setSocketTyping(data);

      // clearInterval(interval);
      //   interval = setInterval(() => {
      //     setSocketTyping(false);
      //   }, 2000);
    });
    // 信息已被好友阅读 @kofeine 040123
    socket.current.on("yourMsgHasBeenRead", (data) => {
      // console.log("my msg has been read:", data);
      dispatch({
        type: SET_READ,
        payload: {
          friendId: data,
        },
      });
    });
    // socket.current.on("youStopTyping", (data) => {
    //   setSocketTyping(data.typeStatus);
    // });

    // 收到好友添加邀请 @kofeine 032723
    socket.current.on("someoneAddYou", (data) => {
      console.log("someone add me", data);
      setSocketFriendAdd(data);
    });
    // 好友通过了邀请 @kofeine 032723
    socket.current.on("someoneAddYouSuccess", (data) => {
      console.log("someone added me", data);
      setSocketFriendAdded(data.friendInfo);
    });
  }, []);

  // 加入聊天室 @kofeine 032123
  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  // 获取在线好友 @kofeine 032123
  useEffect(() => {
    socket.current.on("getActiveUser", (users) => {
      console.log("getActiveUser", users);
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
      // 更新右侧信息 @kofeine 032423
      dispatch({
        type: SOCKET_MESSAGE,
        payload: {
          message: socketMessage,
        },
      });
      // 接收到信息，更新朋友列表显示的信息 @kofeine 032423
      dispatch({
        type: UPDATE_MESSAGE,
        payload: { sentMsg: socketMessage },
      });
      // 接收到信息后，更新朋友列表显示的未读信息（个数） @kofeine 032423
      dispatch({
        type: UPDATE_UNSEEN,
        payload: { sentMsg: socketMessage },
      });
      // 发送消息的是当前打开的好友，直接设为已读 @kofeine 032423
      dispatch(seenAllCurrentFriendMessages(currentFriend._id));
      // 接收到信息，告诉对方已收到，设为已读 @kofeine 032423
      socket.current.emit("haveRead", socketMessage);
    }
  }, [socketMessage]);

  // 检测 socket 输入状态，判断是否需要修改当前朋友的输入状态 @kofeine 032323
  useEffect(() => {
    if (
      socketTyping.senderId === currentFriend._id &&
      socketTyping.recieverId === myInfo.id
    ) {
      if (socketTyping.typeStatus) {
        clearTimeout(countdown.current);
        // console.log("typingggggggggggggggggggggggggg");
        setCurrentFriendTypeStatus(true);
        countdown.current = setTimeout(() => {
          // console.log("stop typing");
          setCurrentFriendTypeStatus(false);
        }, 3000);
      }
    }
  }, [socketTyping]);

  // 有人向我添加好友 @kofeine 032723
  useEffect(() => {
    console.log("someone add me");
    if (socketFriendAdd) {
      dispatch({
        type: UPDATE_REQUESTS,
        payload: {
          request: socketFriendAdd,
        },
      });
      notificationSPlay();
      toast.success(
        socketFriendAdd.senderName + " Send You A Friend Invitation"
      );
    }
  }, [socketFriendAdd]);

  // 好友通过了添加 @kofeine 032723
  useEffect(() => {
    console.log("someone added me friend id", socketFriendAdded.friendId);
    if (socketFriendAdded) {
      dispatch({
        type: UPDATE_REQUESTS_ACCEPT,
        payload: {
          friendId: socketFriendAdded.friendId,
        },
      });
      notificationSPlay();
      toast.success(socketFriendAdded.friendName + " Accept Friend Invitation");
    }
  }, [socketFriendAdded]);
  // 播放提示音，发送方不为当前好友时 @kofeine 032323
  useEffect(() => {
    // 先判断发送人与接收人 @kofeine 032323
    const { senderId, recieverId } = socketMessage;
    if (senderId !== currentFriend._id && recieverId === myInfo.id) {
      notificationSPlay();
      toast.success(socketMessage.senderName + " Send You A Message");
      // 接收到信息，更新朋友列表显示的信息 @kofeine 032423
      dispatch({
        type: UPDATE_MESSAGE,
        payload: { sentMsg: socketMessage },
      });
      // 接收到信息后，更新朋友列表显示的未读信息（个数） @kofeine 032423
      dispatch({
        type: UPDATE_UNSEEN,
        payload: { sentMsg: socketMessage },
      });
    }
  }, [socketMessage]);

  // 获取朋友列表 @kofeine 032223
  useEffect(() => {
    dispatch(getFriends);
  }, []);
  // 获取本地存储的主题 @kofeine 032623
  useEffect(() => {
    dispatch(getTheme);
  }, []);
  useEffect(() => {
    console.log("change current friend !!!!!", friends);
    if (!currentFriend && friends.length > 0) setCurrentFriend(friends[0].info);
  }, [friends]);

  // 监听是否在切换当前好友，获取当前好友的信息，检测 currentFriend @kofeine 031823
  useEffect(() => {
    if (currentFriend._id) {
      dispatch(getMessage(currentFriend._id));
      dispatch(seenAllCurrentFriendMessages(currentFriend._id));
    }
    // 接收到信息，告诉对方已收到，设为已读 @kofeine 032423
    socket.current.emit("haveRead", socketMessage);
  }, [currentFriend?._id]); // 有的话检测其 _id 值 @kofeine 031823

  // 检测信息，然后滚动 @kofeine 031923
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // 发送成功后广播 @kofeine 032323
  useEffect(() => {
    if (sendSuccess) {
      console.log("msg sent");
      // const sentMsgs = messages.filter((m) => m.senderId === myInfo.id);
      // console.log("msg sent:", sentMsg[sentMsg.length - 1]);
      socket.current.emit("sendMessage", messages[messages.length - 1]);
      // 发送信息后，更新朋友列表显示的最新信息 @kofeine 032423
      dispatch({
        type: UPDATE_MESSAGE,
        payload: { sentMsg: messages[messages.length - 1] },
      });

      dispatch({
        type: RESET_SENDSUCCESS,
      });
    }
  }, [sendSuccess]);
  return (
    <div className={theme === "dark" ? "messenger theme" : "messenger"}>
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
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
                        onChange={(e) => dispatch(setTheme(e.target.value))}
                        type="radio"
                        value="dark"
                        name="theme"
                        id="dark"
                        checked={theme === "dark"}
                      />
                    </div>

                    <div className="of">
                      <label htmlFor="white">OFF</label>
                      <input
                        onChange={(e) => dispatch(setTheme(e.target.value))}
                        type="radio"
                        value="light"
                        name="theme"
                        id="light"
                        checked={theme === "light"}
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
                  onChange={(e) => searchFriend(e.target.value)}
                />
              </div>
              <nav>
                <Link to="/addfriend">Add Friend</Link>
                <Link to="/rightside">Message</Link>
                <Link to="/addmoment">Add Moment</Link>
                <Link to="/moment">Moment</Link>
              </nav>
            </div>
            <div className="active-friends">
              <div className="scroll-friends">
                {activeFriends.map(
                  (aFrd) =>
                    aFrd.userInfo.id !== myInfo.id && (
                      <ActiveFriends
                        key={aFrd.userInfo.id}
                        user={aFrd}
                        onClickFunc={() => {
                          const aFriend = friends.find(
                            (frd) => aFrd.userInfo.id === frd.info._id
                          );
                          // console.log(aFriend.info);
                          setCurrentFriend(aFriend.info);
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
                        currentFriend._id === frd.info._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      onClick={() => setCurrentFriend(frd.info)}
                      key={frd.info._id}
                    >
                      <Friend
                        friend={frd}
                        key={frd.info._id}
                        activeFriends={activeFriends}
                      />
                    </div>
                  ))
                : "No Friends"}
            </div>
          </div>
        </div>

        <Routes path="/">
          <Route
            element={
              currentFriend ? (
                <RightSide
                  messages={messages}
                  currentFriend={currentFriend}
                  currentInput={currentInput}
                  inputHandle={inputHandle}
                  sendMessage={handleSend}
                  scrollRef={scrollRef}
                  emojiHandle={emojiHandle}
                  messageHandle={messageHandle}
                  typeStatus={currentFriendTypeStatus}
                />
              ) : (
                <div>"Please Select A Friend"</div>
              )
            }
            path="rightside"
          ></Route>
          <Route
            element={<AddFriend socket={socket} />}
            path="addfriend"
          ></Route>
          <Route
            element={<AddMoment socket={socket} />}
            path="addmoment"
          ></Route>
          <Route element={<Moment socket={socket} />} path="moment"></Route>
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
export default Messenger;
