import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDataId, updatePhone } from "../../../redux/action/user";
import { getDataIdRoom, deleteRoom } from "../../../redux/action/room";
import { getDataChatId, postData } from "../../../redux/action/chat";

import CardEdit from "../../../components/EditProfile/editProfile";
import InviteFriend from "../../../components/InviteFriend/inviteFriend";
import AddRoom from "../../../components/AddRoom/AddRoom";
import Contact from "../../../components/Contact/Contact";

import styles from "./Chat.module.css";
import plus from "../../../assets/img/Plus.png";
import send from "../../../assets/img/back.png";
import menu from "../../../assets/img/Menu.png";
import profileMenu from "../../../assets/img/Profile menu.png";
import back from "../../../assets/img/back.png";

import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Toast,
  Dropdown,
  Modal,
} from "react-bootstrap";

function Chat(props) {
  const [typing, setTyping] = useState({ typing: false });
  const [clickRoom, setClickRoom] = useState(false);
  const [click, setClick] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [dataRoom, setDataRoom] = useState([]);
  const [isUpdatePhone, setisUpdatePhone] = useState(false);
  const [invite, setInvite] = useState(false);
  const [addRoom, setAddRoom] = useState(false);
  const [contact, setContact] = useState(false);
  const [dataFriend, setDataFriend] = useState({});
  const [userOnline, setUserOnline] = useState([]);
  const [isProfileFriend, setIsProfileFriend] = useState(false);
  const [idRoom, setIdRoom] = useState("");

  const [notif, setNotif] = useState({ show: false });

  const userid = localStorage.getItem("userId");
  const username = localStorage.getItem("userName");
  const isMounted = React.useRef(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");

    getDataById(id);
    getDataRoomId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataById = (id) => {
    props.getDataId(id).then((res) => {
      setData(res.action.payload.data.data[0]);
    });
  };

  const getDataRoomId = (id) => {
    props.getDataIdRoom(id).then((res) => {
      setDataRoom(res.action.payload.data.data);
    });
  };

  // const username = localStorage.getItem("userName");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({ new: "", old: "" });
  // const [oldRoom, setoldRoom] = useState("");
  const [selectRoom, setSelectRoom] = useState("");

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        // console.log(dataMessage);
        setMessages([...messages, dataMessage]);
      });

      // connect();
    }
    isMounted.current = true;
    if (props.socket) {
      if (isMounted.current) {
        connect();
      }
    }
    return () => {
      // executed when unmount
      isMounted.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const connect = () => {
    props.socket.emit("connect-server", { userid, username });
    props.socket.on("list-user-online", (listUserOnline) => {
      setUserOnline(listUserOnline);
    });

    props.socket.on("notif-message", (data) => {
      console.log(data);
      setNotif(data);
    });
    props.socket.on("typing", (data) => {
      // console.log(data);
      setTyping(data);
    });
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
    props.socket.emit("typing", {
      userName: username,
      room: room.new,
      typing: true,
    });
  };
  const handleStopTyping = () => {
    setTimeout(() => {
      props.socket.emit("typing", {
        userName: username,
        room: selectRoom,
        typing: false,
      });
    }, 2000);
  };
  const handleSendMessage = (data) => {
    const setData = {
      userid: parseInt(userid),
      friendId: dataFriend.akun_id,
      room: selectRoom,
      userName: username,
      show: true,
      message,
    };
    const setDataChat = {
      userId: localStorage.getItem("userId"),
      friendId: dataFriend.akun_id,
      roomChat: selectRoom,
      Message: message,
    };
    // console.log("asdasdda", setData);
    props.socket.emit("typing", {
      userName: username,
      room: room.new,
      typing: false,
    });
    // props.socket.emit("roomMessage", setData);
    props.postData(setDataChat).then((res) => {
      props.socket.emit("roomMessage", setData);
    });
    props.socket.emit("notif-message", setData);
    setMessage("");
  };
  // const handleSetting = () => {
  //   props.history.push("../../../components/EditProfile/editProfile.js");
  // };
  const handleAddRoom = () => {
    setAddRoom(true);
  };
  const handleContact = () => {
    setContact(true);
  };
  const handleRoom = (item) => {
    props.getDataChatId(item.room_chat).then((res) => {
      // console.log(res);
      // console.log(res.action.payload.data.data)
      setMessages(res.action.payload.data.data);
    });
    props.getDataId(item.friend_id).then((res) => {
      // console.log(res);
      // console.log("ssaassad", res.action.payload)
      setDataFriend(res.action.payload.data.data[0]);
    });
    const { akun_name } = data;
    props.socket.emit("joinRoom", {
      room: item.room_chat,
      oldRoom: room.old,
      akun_name,
    });
    setSelectRoom(item.room_chat);
    setRoom({ ...room, new: item.room_chat, old: item.room_chat });
    setIdRoom(item);
    setClick(true);
  };
  const handleHome = () => {
    setClick(false);
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleBack = () => {
    setIsEdit(false);
  };
  const handleClose = () => {
    setisUpdatePhone(false);
    localStorage.removeItem("token");
    props.history.push("/");
  };
  const handleinviteFriend = () => {
    setInvite(true);
  };
  const handleCloseInvite = () => {
    setInvite(false);
  };
  const handleCloseAddRoom = () => {
    setAddRoom(false);
  };
  const handleCloseContact = () => {
    setContact(false);
  };

  const handleDeleteRoom = () => {
    const id = idRoom.room_chat_id;
    props.deleteRoom(id).then((res) => {
      window.confirm("Anda Yakin menghapus Chat ini ?");
      getDataRoomId(localStorage.getItem("userId"));
      setIsProfileFriend(false);
      setMessages([]);
      setClick(false);
    });
  };
  const profileFriend = () => {
    setIsProfileFriend(true);
  };
  const closeProfileFriend = () => {
    setIsProfileFriend(false);
  };
  let Users = [];

  userOnline.map((item) => {
    return Users.push(parseInt(item));
  });
  // console.log(userOnline);
  // console.log(dataFriend.akun_id);
  console.log(notif);
  return (
    <Container fluid className={styles.bg}>
      {click && (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
          <Toast
            onClose={() => setNotif({ ...notif, show: false })}
            show={notif.show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Muichat ({notif.userName})</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>{notif.message}</Toast.Body>
          </Toast>
        </div>
      )}
      <div style={{ position: "fixed", top: 20, right: 20 }}>
        <Toast
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Muichat ({notif.userName})</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{notif.message}</Toast.Body>
        </Toast>
      </div>
      {invite && (
        <InviteFriend
          show={invite}
          close={handleCloseInvite}
          data={data}
          handleGetId={getDataById}
        />
      )}
      {isUpdatePhone && (
        <Modal show={isUpdatePhone} onHide={handleClose}>
          <Modal.Title className={styles.modalPhone}>
            Update Phone Number
          </Modal.Title>

          <Modal.Body>
            <p className={styles.textModalPhone}>
              After you change phone, you must be login again
            </p>
          </Modal.Body>
        </Modal>
      )}
      <Row>
        {isEdit ? (
          <CardEdit
            edit={isEdit}
            back={handleBack}
            data={data}
            isUpdatePhone={setisUpdatePhone}
            handleGetId={getDataById}
          />
        ) : (
          <Col sm={3} className={styles.mainCol}>
            <Card className={styles.mainCard}>
              <Row>
                <Col>
                  <h1 className={styles.title} onClick={handleHome}>
                    MuiChat,
                  </h1>
                </Col>
                <Col>
                  <Dropdown drop="left">
                    <Dropdown.Toggle className={styles.drop}>
                      <img alt="" src={menu} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.menuDrop}>
                      <Dropdown.Item
                        className={styles.item}
                        onClick={handleEdit}
                      >
                        Settings
                      </Dropdown.Item>

                      <Dropdown.Item
                        className={styles.item}
                        onClick={handleContact}
                      >
                        Contacts
                      </Dropdown.Item>
                      {contact && (
                        <Contact
                          show={contact}
                          close={handleCloseContact}
                          data={data}
                          handleGetData={getDataRoomId}
                        />
                      )}
                      <Dropdown.Item
                        className={styles.item}
                        onClick={handleinviteFriend}
                      >
                        Invite Friends
                      </Dropdown.Item>

                      <Dropdown.Item className={styles.item}>
                        MuiChat FAQ
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <Card className={styles.cardProfile} onClick={handleEdit}>
                <Card.Img
                  src={`https://chatmui.herokuapp.com/backend3/api/${data.akun_image}`}
                  variant="top"
                  className={styles.profileImg}
                />
                <Card.Body>
                  <Card.Text className={styles.profileName}>
                    {data.akun_name}
                  </Card.Text>
                  <Card.Text className={styles.profileId}>
                    @{data.akun_add_id}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className={styles.cardContact}>
                <Row>
                  <Col xs={10}>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Type your message.d.."
                          className={styles.searchMessage}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col xs={2}>
                    <img
                      alt=""
                      src={plus}
                      className={styles.plus}
                      onClick={handleAddRoom}
                    />
                    {addRoom && (
                      <AddRoom
                        show={addRoom}
                        close={handleCloseAddRoom}
                        data={data}
                        setClickRoom={setClickRoom}
                        handleGetData={getDataRoomId}
                        clickRoom={clickRoom}
                      />
                    )}
                  </Col>
                </Row>
              </Card>
            </Card>
            {dataRoom.map((item, index) => {
              // console.log(item);
              return (
                <>
                  {" "}
                  <Card
                    key={index}
                    className={styles.contactList}
                    onClick={() => handleRoom(item)}
                  >
                    <Row>
                      <Col>
                        <Card.Img
                          variant="left"
                          src={`https://chatmui.herokuapp.com/backend3/api/${item.akun_image}`}
                          className={styles.ppImg}
                        />
                      </Col>
                      <Col xs={6}>
                        <Card.Text className={styles.name}>
                          {item.akun_name}
                        </Card.Text>
                        <Card.Text className={styles.bio}>
                          {item.akun_bio}
                        </Card.Text>
                      </Col>
                      <Col>
                        <p className={styles.time}>15:20</p>
                      </Col>
                    </Row>
                  </Card>
                </>
              );
            })}
          </Col>
        )}

        <Col
          sm={isProfileFriend ? 6 : 9}
          className={click ? styles.chatRoom : styles.mainColChat}
        >
          {click ? (
            <>
              <Card className={styles.cardRoom}>
                <div style={{ position: "fixed", top: 20, right: 20 }}>
                  <Toast
                    onClose={() => setNotif({ ...notif, show: false })}
                    show={notif.show}
                    delay={3000}
                    autohide
                  >
                    <Toast.Header>
                      <strong className="me-auto">Muichat ({notif.userName})</strong>
                      <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body>{notif.message}</Toast.Body>
                  </Toast>
                </div>
                <Row>
                  <Col
                    xs={isProfileFriend ? 2 : 3}
                    className={styles.handleImage}
                  >
                    <Card.Img
                      variant="left"
                      src={`https://chatmui.herokuapp.com/backend3/api/${dataFriend.akun_image}`}
                      className={styles.roomImg}
                      onClick={handleHome}
                    />
                  </Col>
                  <Col xs={isProfileFriend ? 7 : 7} className={styles.profile}>
                    <Card.Text className={styles.nameFriend}>
                      {dataFriend.akun_name}
                    </Card.Text>
                    <Card.Text className={styles.statusFriend}>
                      {Users.includes(dataFriend.akun_id)
                        ? "Online"
                        : "Offline"}
                    </Card.Text>
                  </Col>
                  <Col xs={1}>
                    <Dropdown drop="left">
                      <Dropdown.Toggle className={styles.dropFriend}>
                        <img
                          alt=""
                          src={profileMenu}
                          className={styles.imgMenuProfile}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={styles.menuRoom}>
                        <Dropdown.Item
                          className={styles.itemRoom}
                          onClick={profileFriend}
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.itemRoom}
                          onClick={handleDeleteRoom}
                        >
                          Delete Chat
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Card>
              <div className={styles.chatWindow}>
                <br />
                <br />
                <Row xs={1} className={styles.rowChat}>
                  {messages.map((itema, index1) => {
                    // console.log(itema);
                    // console.log(data.akun_id);
                    return (
                      <>
                        <Col
                          key={index1}
                          className={`d-flex gy-4 
                          ${itema.sender_id === data.akun_id ||
                              itema.senderId === data.akun_id
                              ? "justify-content-end"
                              : "justify-content-start"
                            }`}
                        >
                          <div
                            className={`d-flex align-items-center ${styles.chatTxtContainer
                              } ${itema.sender_id === data.akun_id ||
                                itema.senderId === data.akun_id
                                ? styles.receiver
                                : styles.sender
                              }`}
                          >
                            <p className="m-0">{itema.message}</p>
                          </div>
                        </Col>
                      </>
                    );
                  })}
                  {typing.typing && (
                    <Col className="justify-content-start">
                      <div
                        className={`d-flex align-items-center mt-2 ${styles.chatTxtContainer} ${styles.sender}`}
                      >
                        <p>
                          <em>{typing.userName} is typing a message...</em>
                        </p>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
              <Card className={styles.cardMessage}>
                <Row className={styles.rowMessage}>
                  <Col xs={message ? 10 : 8}>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Type your message..."
                          className={styles.formMessage}
                          value={message}
                          onChange={(event) => {
                            handleChangeText(event);
                            handleStopTyping();
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  {message ? (
                    <Col>
                      {" "}
                      <img
                        alt=""
                        src={send}
                        className={styles.sendMessage}
                        onClick={() => handleSendMessage(data.akun_id)}
                      />
                    </Col>
                  ) : (
                    <>
                    </>
                  )}
                </Row>
              </Card>
            </>
          ) : (
            <h1 className={styles.mainTextChat}>
              Welcome to MuiChat :)
            </h1>
          )}
        </Col>
        {isProfileFriend && (
          <Col sm={3}>
            <Card className={styles.mainCard}>
              <Row>
                <Col xs={3}>
                  <img
                    alt=""
                    src={back}
                    onClick={closeProfileFriend}
                    className={styles.imgBack}
                  />
                </Col>
                <Col xs={8}>
                  <Card.Text className={styles.profileId}>
                    {dataFriend.akun_add_id}
                  </Card.Text>
                </Col>
              </Row>

              <Card className={styles.cardProfile}>
                <Card.Img
                  src={`https://chatmui.herokuapp.com/backend3/api/${dataFriend.akun_image}`}
                  variant="top"
                  className={styles.profileImg}
                />

                <Card.Text className={styles.profileId1}>
                  {dataFriend.akun_name}
                </Card.Text>
                <Card.Text className={styles.profileId2}>Online</Card.Text>

                <Card.Text className={styles.phone}>Phone Number</Card.Text>

                <Card.Text className={styles.textId}>
                  {dataFriend.akun_phone}
                </Card.Text>
              </Card>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  room: state.room,
  chat: state.chat,
});

const mapDispatchToProps = {
  getDataId,
  updatePhone,
  getDataIdRoom,
  getDataChatId,
  postData,
  deleteRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);