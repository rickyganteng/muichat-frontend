import React, { Component } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updatePhone, getDataId } from "../../redux/action/user";

import styles from "./editProfile.module.css";

import sample from "../../assets/img/Rectangle 8.png";
import back from "../../assets/img/back.png";
import reset from "../../assets/img/Group 5.png";
import logout from "../../assets/img/Chat.png";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      isUpdate: false,
      form: {
        userName: "",
        userAddId: "",
        userBio: "",
        userMail: "",
      },
      formPhone: {
        userPhone: "",
      },
      isUpdatePhone: false,
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("userId");
    this.getDataById(id);
  }
  getDataById = (id) => {
    this.props.getDataId(id);
  };
  handleUpdate = () => {
    this.setState({ isUpdate: true });
  };
  handlePhone = () => {
    this.setState({
      formPhone: {
        userPhone: this.props.data.akun_phone,
      },
    });
    this.setState({ isUpdatePhone: true });
  };
  handleClose = () => {
    this.setState({ isUpdatePhone: false });
  };
  changeTextPhone = (event) => {
    event.preventDefault();
    this.setState({
      formPhone: {
        ...this.state.formPhone,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleUpdate = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId");
    this.props.updatePhone(id, this.state.formPhone).then((res) => {
      window.confirm("Yakin ingin Update ?");
      this.getDataById(id);
      this.setState({ isUpdatePhone: false });
    });
  };
  handleLogout = () => {
    localStorage.removeItem("token");
    window.confirm("Yakin Ingin Keluar ?");
    this.props.history.push("/");
  };
  render() {
    console.log(this.state.formPhone);
    const { akun_add_id, akun_name, akun_phone, akun_bio } = this.props.data;
    return (
      <>
        <Col sm={3} className={styles.mainCol}>
          <Card className={styles.mainCard}>
            <Row>
              <Col xs={4}>
                <img
                  alt=""
                  src={back}
                  onClick={this.props.back}
                  className={styles.imgBack}
                />
              </Col>
              <Col xs={8}>
                <Card.Text className={styles.profileId}>
                  {akun_add_id}
                </Card.Text>
              </Col>
            </Row>

            <Card className={styles.cardProfile}>
              <Card.Img
                src={sample}
                variant="top"
                className={styles.profileImg}
              />
              <Card.Body>
                <Card.Text className={styles.profileName}>
                  {akun_name}
                </Card.Text>
                <Card.Text className={styles.profileId1}>
                  {akun_add_id}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className={styles.cardEdit}>
              <Card.Title>
                <h1 className={styles.title}>Account</h1>
              </Card.Title>
              <Card.Text className={styles.phone}>{akun_phone}</Card.Text>
              <p onClick={this.handlePhone} className={styles.changePhone}>
                Tap to change phone number
              </p>
              <Modal show={this.state.isUpdatePhone} onHide={this.handleClose}>
                <Modal.Title className={styles.modalPhone}>
                  Update Phone Number
                </Modal.Title>

                <Modal.Body>
                  <Form onSubmit={(event) => this.handleUpdate(event)}>
                    <Form.Group>
                      <Form.Control
                        type="number"
                        name="userPhone"
                        value={this.state.formPhone.userPhone}
                        onChange={(event) => this.changeTextPhone(event)}
                      />
                    </Form.Group>
                    <Button type="submit" className={styles.btn}>
                      Update
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
              <Card.Text onClick={this.handleUpdate} className={styles.textId}>
                {this.state.isUpdate ? (
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder={akun_add_id}
                        value={akun_add_id}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  akun_add_id
                )}
              </Card.Text>

              <Card.Text className={styles.userName}>Username</Card.Text>
              <Card.Text className={styles.textId}>{akun_bio}</Card.Text>
              <Card.Text className={styles.userName}>Bio</Card.Text>


              <Card.Title className={styles.title}>Settings</Card.Title>
              <Row className={styles.clickChange}>
                <Col xs={2}>
                  <img alt="" src={reset} className={styles.reset} />
                </Col>
                <Col xs={10} className={styles.changePass}>
                  Change Password
                </Col>
              </Row>
              <Row className={styles.clickChange}>
                <Col xs={2}>
                  <img alt="" src={logout} className={styles.logout} />
                </Col>
                <Col
                  xs={10}
                  className={styles.changePass}
                  onClick={this.handleLogout}
                >
                  Logout
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { updatePhone, getDataId };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
