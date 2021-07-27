import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDataId, updatePhone } from "../../../redux/action/user";
import { getDataIdRoom, deleteRoom } from "../../../redux/action/room";
import { getDataChatId, postDataChat } from "../../../redux/action/chat";

import CardEdit from "../../../components/EditProfile/editProfile";
import InviteFriend from "../../../components/InviteFriend/inviteFriend";
import AddRoom from "../../../components/AddRoom/AddRoom";
import Contact from "../../../components/Contact/Contact";

import styles from "./Chat.module.css";
import plus from "../../../assets/img/Plus.png";
import send from "../../../assets/img/back.png";
import menu from "../../../assets/img/Menu.png";
import profileMenu from "../../../assets/img/Profile menu.png";
import plusMessage from "../../../assets/img/Plus.png";
import sticker from "../../../assets/img/Vector (3).png";
import pics from "../../../assets/img/Group 181.png";
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
  const [click, setClick] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [dataRoom, setDataRoom] = useState([]);
  const [isUpdatePhone, setisUpdatePhone] = useState(false);
  const [invite, setInvite] = useState(false);
  const [addRoom, setAddRoom] = useState(false);
  const [contact, setContact] = useState(false);
  const [dataFriend, setDataFriend] = useState({});
  const [idRoom, setIdRoom] = useState("");
  const [clickRoom, setClickRoom] = useState(false);
  const [isProfileFriend, setIsProfileFriend] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({ new: "", old: "" });
  // const [oldRoom, setoldRoom] = useState("");
  const [selectRoom, setSelectRoom] = useState("");
  const [userOnline, setUserOnline] = useState([]);

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
  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
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
      setNotif(data);
    });
  };
  const handleChangeText = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (data) => {
    const setData = {
      userid: parseInt(userid),
      friendId: data,
      room: selectRoom,
      userName: username,
      username: data.user_name,
      show: true,
      message,
    };
    const setDataChat = {
      userId: localStorage.getItem("userId"),
      friendId: data,
      roomChat: selectRoom,
      Message: message,
    };
    console.log(selectRoom);
    props.socket.emit("notif-message", setData);
    props.postDataChat(setDataChat).then((res) => {
      props.socket.emit("roomMessage", setData);
    });
    setMessage("");
  };
  const handleAddRoom = () => {
    setAddRoom(true);
  };
  const handleContact = () => {
    setContact(true);
  };
  const handleRoom = (item) => {
    props.getDataChatId(item.room_chat).then((res) => {
      setMessages(res.action.payload.data.data);
    });
    props.getDataId(item.user_id).then((res) => {
      console.log(res);
      setDataFriend(res.action.payload.data.data[0]);
    });
    const { user_name } = data;
    props.socket.emit("joinRoom", {
      room: item.room_chat,
      oldRoom: room.old,
      user_name,
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
    console.log(idRoom);
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

  console.log(Users);
  console.log(dataFriend.user_id);
  console.log(notif);
  return (
    <Container fluid>
      {click && (
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          <Toast
            onClose={() => setNotif({ ...notif, show: false })}
            show={notif.show}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">
                TeleDemy App ({notif.userName})
              </strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>{notif.message}</Toast.Body>
          </Toast>
        </div>
      )}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <Toast
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">TeleDemy App ({notif.userName})</strong>
            <small className="text-muted">just now</small>
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
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalPhone}>
              Update Phone Number
            </Modal.Title>
          </Modal.Header>

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
            socket={props.socket}
          />
        ) : (
          <Col sm={3} className={click ? styles.mainCol1 : styles.mainCol}>
            <Card className={styles.mainCard}>
              <Row>
                <Col>
                  <h1 className={styles.title} onClick={handleHome}>
                    Teledemy
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
                        Telegram FAQ
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <Card className={styles.cardProfile} onClick={handleEdit}>
                <Card.Img
                  src={`https://teledemyapp.herokuapp.com/backend3/api/${data.image_user}`}
                  variant="top"
                  className={styles.profileImg}
                />
                <Card.Body>
                  <Card.Text className={styles.profileName}>
                    {data.user_name}
                  </Card.Text>
                  <Card.Text className={styles.profileId}>
                    @{data.user_add_id}
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
                          placeholder="Type your message..."
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
                        handleGetData={getDataRoomId}
                        setClickRoom={setClickRoom}
                        clickRoom={clickRoom}
                      />
                    )}
                  </Col>
                </Row>
              </Card>
            </Card>

            {dataRoom.map((item, index) => {
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
                          src={`https://teledemyapp.herokuapp.com/backend3/api/${item.image_user}`}
                          className={styles.ppImg}
                        />
                      </Col>
                      <Col xs={6}>
                        <Card.Text className={styles.name}>
                          {item.user_name}
                        </Card.Text>
                        <Card.Text className={styles.bio}>
                          {item.user_bio}
                        </Card.Text>
                      </Col>
                      <Col></Col>
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
                <div style={{ position: "absolute", top: 20, right: 20 }}>
                  <Toast
                    onClose={() => setNotif({ ...notif, show: false })}
                    show={notif.show}
                    delay={3000}
                    autohide
                  >
                    <Toast.Header closeButton={false}>
                      <strong className="me-auto">
                        TeleDemy App ({notif.userName})
                      </strong>
                      <small className="text-muted">just now</small>
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
                      src={`https://teledemyapp.herokuapp.com/backend3/api/${dataFriend.image_user}`}
                      className={styles.roomImg}
                      onClick={handleHome}
                    />
                  </Col>
                  <Col xs={isProfileFriend ? 7 : 7} className={styles.profile}>
                    <Card.Text className={styles.nameFriend}>
                      {dataFriend.user_name}
                    </Card.Text>
                    <Card.Text className={styles.statusFriend}>
                      {Users.includes(dataFriend.user_id)
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
                          Delete Room
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Card>
              <div className={styles.chatWindow}>
                <Row className={styles.rowChat}>
                  {messages.map((item, index) => {
                    return (
                      <>
                        <Col xs={2} className={styles.colChat}>
                          <img
                            alt=""
                            variant="left"
                            src={`https://teledemyapp.herokuapp.com/backend3/api/${dataFriend.image_user}`}
                            className={styles.messageImg}
                          />
                        </Col>
                        <Col xs={10} className={styles.colChat}>
                          <p className={styles.message}>{item.message}</p>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
              <Card className={styles.cardMessage}>
                <Row className={styles.rowMessage}>
                  <Col xs={message ? 10 : 8}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        className={styles.formMessage}
                        value={message}
                        onChange={(event) => handleChangeText(event)}
                      />
                    </Form.Group>
                  </Col>
                  {message ? (
                    <Col>
                      {" "}
                      <img
                        alt=""
                        src={send}
                        className={styles.sendMessage}
                        onClick={() => handleSendMessage(dataFriend.user_id)}
                      />
                    </Col>
                  ) : (
                    <>
                      <Col xs={1}>
                        {" "}
                        <img
                          alt=""
                          src={plusMessage}
                          className={styles.plusMessage}
                        />
                      </Col>
                      <Col xs={1}>
                        <img alt="" src={sticker} className={styles.sticker} />
                      </Col>
                      <Col xs={1}>
                        <img alt="" src={pics} className={styles.pics} />
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            </>
          ) : (
            <h1 className={styles.mainTextChat}>
              Please select a chat to start messaging
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
                    {dataFriend.user_add_id}
                  </Card.Text>
                </Col>
              </Row>

              <Card className={styles.cardProfile}>
                <Card.Img
                  src={`https://teledemyapp.herokuapp.com/backend3/api/${dataFriend.image_user}`}
                  variant="top"
                  className={styles.profileImg}
                />

                <Card.Text className={styles.profileId1}>
                  {dataFriend.user_name}
                </Card.Text>
                <Card.Text className={styles.profileId2}>Online</Card.Text>

                <Card.Text className={styles.phone}>Phone Number</Card.Text>

                <Card.Text className={styles.textId}>
                  {dataFriend.user_phone}
                </Card.Text>
              </Card>
              <Row className={styles.rowBottom}>
                <Col className={styles.colBottom}>Location</Col>
                <Col className={styles.colBottom}>Image</Col>
                <Col className={styles.colBottom}>Document</Col>
              </Row>
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
  postDataChat,
  deleteRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);