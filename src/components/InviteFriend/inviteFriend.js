import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllData } from "../../redux/action/user";
import { postData } from "../../redux/action/contact";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";

import styles from "./inviteFriend.module.css";

class InviteFriend extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      data: [],
      form: {
        userId: "",
        friendId: "",
      },
    };
  }

  changeText = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearch = () => {
    const { search } = this.state;
    this.props.getAllData(search).then((res) => {
      this.setState({ data: res.action.payload.data.data });
    });
  };
  handleInvite = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId");
    const friendId = this.state.data[0].akun_id;
    console.log(friendId);

    this.props.postData({ contactUserId: id, contactFriendId: friendId }).then((res) => {
      this.props.handleGetId(id);
      this.props.close();
    });
  };
  render() {
    console.log(this.props.setClickRoom);
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Container>
            <Modal.Title className={styles.title}>Invite Friend</Modal.Title>
            <Form className={styles.formSearch}>
              <Form.Group>
                <Row>
                  <Col xs={9}>
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder="Search contact by email"
                      className={styles.control}
                      name="search"
                      value={this.state.search}
                      onChange={(event) => this.changeText(event)}
                    />
                  </Col>
                  <Col xs={3}>
                    <Button onClick={this.handleSearch} className={styles.btn}>
                      Invite
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            {this.props.user.isError ? (
              <h1 className={styles.title}>{this.props.user.msg}</h1>
            ) : (
              this.state.data.map((item, index) => {
                console.log(item);
                return (
                  <Card key={index} className={styles.cardFriend}>
                    <Card.Img
                      type="top"
                      src={`http://localhost:3009/backend3/api/${item.akun_image}`}
                      className={styles.imgFriend}
                    />

                    <Card.Text className={styles.name}>
                      {item.akun_name}
                    </Card.Text>
                    <Card.Text className={styles.email}>
                      {item.akun_email}
                    </Card.Text>
                    <Card.Text className={styles.bio}>
                      {item.akun_bio}
                    </Card.Text>
                    <Button
                      className={styles.btn}
                      onClick={(event) => this.handleInvite(event)}
                    >
                      Invite
                    </Button>
                  </Card>
                );
              })
            )}
          </Container>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contact: state.contact,
  user: state.user,
});

const mapDispatchToProps = { getAllData, postData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InviteFriend));