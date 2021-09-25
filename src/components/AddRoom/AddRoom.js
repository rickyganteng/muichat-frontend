import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllData } from "../../redux/action/contact";
import { postData } from "../../redux/action/room";

import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import styles from "./AddRoom.module.css";

class AddRoom extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      data: [],
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("userId");
    this.getAllDataContact(id);
  }
  getAllDataContact = (id) => {
    this.props.getAllData(id).then((res) => {
      console.log(res);
      this.setState({ data: res.action.payload.data.data });
    });
  };
  handleInvite = (id) => {
    const idUser = localStorage.getItem("userId");
    console.log(this.props);
    this.props.postData({ userId: idUser, friendId: id }).then((res) => {
      this.props.close();
      this.props.setClickRoom(true);
      this.props.handleGetData(idUser);
    });
  };
  render() {
    console.log(this.props);
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Container>
            <Modal.Title className={styles.title}>Contacts List</Modal.Title>

            {this.state.data.map((item, index) => {
              console.log(item);
              return (
                <Card key={index} className={styles.cardFriend}>
                  <Row>
                    <Col xs={2}>
                      <Card.Img
                        type="left"
                        src={`https://chatmui.herokuapp.com/backend3/api/${item.akun_image}`}
                        className={styles.imgFriend}
                      />
                    </Col>
                    <Col xs={7}>
                      <Card.Text className={styles.name}>
                        {item.akun_name}
                      </Card.Text>
                      <Card.Text className={styles.email}>
                        {item.akun_email}
                      </Card.Text>
                      <Card.Text className={styles.bio}>
                        {item.akun_bio}
                      </Card.Text>
                    </Col>
                    <Col xs={3}>
                      <Button
                        className={styles.btn}
                        onClick={() => this.handleInvite(item.akun_id)}
                      >
                        Chat
                      </Button>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Container>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  contact: state.contact,
  room: state.room,
});

const mapDispatchToProps = { getAllData, postData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddRoom));
