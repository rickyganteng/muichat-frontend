import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDataId } from "../../../redux/action/user";

import CardEdit from "../../../components/EditProfile/editProfile";

import styles from "./Chat.module.css";
import sample from "../../../assets/img/Rectangle 8.png";
import plus from "../../../assets/img/Plus.png";
import menu from "../../../assets/img/Menu.png";
import profileMenu from "../../../assets/img/Profile menu.png";
import plusMessage from "../../../assets/img/Plus.png";
import sticker from "../../../assets/img/Vector (3).png";
import pics from "../../../assets/img/Group 181.png";

import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Badge,
  Dropdown,
} from "react-bootstrap";

function Chat(props) {
  const [click, setClick] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("userId");
    getDataById(id);
  }, []);

  const getDataById = (id) => {
    props.getDataId(id).then((res) => {
      setData(res.action.payload.data.data[0]);
    });
  };
  // const username = localStorage.getItem("token");
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [room, setRoom] = useState({ new: "", old: "" });
  // // const [oldRoom, setoldRoom] = useState("");

  // useEffect(() => {
  //   if (props.socket) {
  //     props.socket.on("chatMessage", (dataMessage) => {
  //       setMessages([...messages, dataMessage]);
  //     });
  //   }
  // }, [props.socket, messages]);

  // const handleSelectRoom = (event) => {
  //   // if (room.old) {
  //   //   console.log("sudah pernah masuk ke room " + room.old);
  //   //   console.log("dan akan masuk ke room " + event.target.value);
  //   // } else {
  //   //   console.log("belum pernah masuk ke ruang manapun");
  //   //   console.log("dan akan masuk ke room " + event.target.value);
  //   // }

  //   // console.log(event.target.value);
  //   props.socket.emit("joinRoom", {
  //     room: event.target.value,
  //     oldRoom: room.old,
  //     username,
  //   });
  //   setRoom({ ...room, new: event.target.value, old: event.target.value });
  // };

  // const handleChangeText = (event) => {
  //   setMessage(event.target.value);
  // };

  // const handleSendMessage = () => {
  //   console.log("Username :", username);
  //   console.log("Room :", room);
  //   console.log("Send Message :", message);
  //   // const setData = {
  //   //   username,
  //   //   message,
  //   // };
  //   // props.socket.emit("globalMessage", setData);
  //   // props.socket.emit("privateMessage", setData);
  //   // props.socket.emit("broadcastMessage", setData);

  //   const setData = {
  //     room: room.new,
  //     username,
  //     message,
  //   };
  //   props.socket.emit("roomMessage", setData);
  //   setMessage("");
  // };
  const handleRoom = () => {
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
  console.log(data);
  return (
    <Container fluid>
      <Row>
        {isEdit ? (
          <CardEdit edit={isEdit} back={handleBack} data={data} />
        ) : (
          <Col sm={3} className={styles.mainCol}>
            <Card className={styles.mainCard}>
              <Row>
                <Col>
                  <h1 className={styles.title} onClick={handleHome}>
                    Telegram
                  </h1>
                </Col>
                <Col>
                  <Dropdown drop="left">
                    <Dropdown.Toggle className={styles.drop}>
                      <img alt="" src={menu} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.menuDrop}>
                      <Dropdown.Item className={styles.item}>
                        Settings
                      </Dropdown.Item>

                      <Dropdown.Item className={styles.item}>
                        Contacts
                      </Dropdown.Item>

                      <Dropdown.Item className={styles.item}>
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
                  src={sample}
                  variant="top"
                  className={styles.profileImg}
                />
                <Card.Body>
                  <Card.Text className={styles.profileName}>
                    {data.akun_name}
                  </Card.Text>
                  <Card.Text className={styles.profileId}>
                    {data.akun_add_id}
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
                    <img alt="" src={plus} className={styles.plus} />
                  </Col>
                </Row>
              </Card>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
            <Card className={styles.contactList} onClick={handleRoom}>
              <Row>
                <Col>
                  <Card.Img
                    variant="left"
                    src={sample}
                    className={styles.ppImg}
                  />
                </Col>
                <Col xs={6}>
                  <Card.Text className={styles.name}>Theresa Webb</Card.Text>
                  <Card.Text className={styles.bio}>
                    Why did you do that?
                  </Card.Text>
                </Col>
                <Col>
                  <p className={styles.time}>15:20</p>
                  <Badge className={styles.notif}>2</Badge>
                </Col>
              </Row>
            </Card>
          </Col>
        )}

        <Col sm={9} className={click ? styles.chatRoom : styles.mainColChat}>
          {click ? (
            <>
              <Card className={styles.cardRoom}>
                <Row>
                  <Col xs={1} className={styles.handleImage}>
                    <Card.Img
                      variant="left"
                      src={sample}
                      className={styles.roomImg}
                    />
                  </Col>
                  <Col xs={10} className={styles.profile}>
                    <Card.Text className={styles.nameFriend}>
                      Mother ❤
                    </Card.Text>
                    <Card.Text className={styles.statusFriend}>
                      Online
                    </Card.Text>
                  </Col>
                  <Col xs={1}>
                    <img
                      alt=""
                      src={profileMenu}
                      className={styles.imgMenuProfile}
                    />
                  </Col>
                </Row>
              </Card>
              <div className={styles.chatWindow}>
                <h1>HAI</h1>
                <h1>HAI</h1>
                <h1>HAI</h1>
                <h1>HAI</h1>
              </div>
              <Card className={styles.cardMessage}>
                <Row>
                  <Col xs={8}>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Type your message..."
                          className={styles.formMessage}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
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
                </Row>
              </Card>
            </>
          ) : (
            <h1 className={styles.mainTextChat}>
              Please select a chat to start messaging
            </h1>
          )}
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.akun,
  auth: state.auth,
});

const mapDispatchToProps = { getDataId };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
