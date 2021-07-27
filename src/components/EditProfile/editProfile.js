import React, { Component } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  updatePhone,
  getDataId,
  updateData,
  updateImage,
} from "../../redux/action/user";

import styles from "./editProfile.module.css";

import back from "../../assets/img/back.png";
import reset from "../../assets/img/Group 5.png";
import logout from "../../assets/img/Chat.png";
import resetBack from "../../assets/img/Plus.png";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      isUpdate: false,
      form: {
        userName: "",
        userAddId: "",
        userBio: "",
      },
      formPhone: {
        userPhone: "",
      },
      formImage: {
        imageUser: null,
      },
      isUpdatePhone: false,
      isUpdateName: false,
      isUpdateBio: false,
      isUpdateImage: false,
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("userId");
    this.getDataById(id);
  }
  getDataById = (id) => {
    console.log(id);
    this.props.getDataId(id);
  };
  handleUpdate = () => {
    this.setState({
      form: {
        userAddId: this.props.data.akun_add_id,
      },
    });
    this.setState({ isUpdate: true });
  };
  handleUpdateName = () => {
    this.setState({
      form: {
        userName: this.props.data.akun_name,
      },
    });
    this.setState({ isUpdateName: true });
  };
  handleBio = () => {
    this.setState({
      form: {
        userBio: this.props.data.akun_bio,
      },
    });
    this.setState({ isUpdateBio: true });
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

  changeText = (event) => {
    event.preventDefault();
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value },
    });
  };
  updatePhone = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId");
    this.props.updatePhone(id, this.state.formPhone).then((res) => {
      window.confirm("Yakin ingin Update nomor telepon Anda ?");
      this.props.isUpdatePhone(true);
      this.getDataById(id);
      this.setState({ isUpdatePhone: false });
    });
  };
  updateDataImage = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("imageUser", this.state.formImage.imageUser);
    this.props.updateImage(id, formData).then((res) => {
      window.confirm("Yakin ingin Update Data Anda ?");
      this.props.handleGetId(id);
      this.setState({
        isUpdateImage: false,
      });
    });
  };
  updateData = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId");

    this.props.updateData(id, this.state.form).then((res) => {
      window.confirm("Yakin ingin Update Data Anda ?");
      // this.getDataById(id);
      this.props.handleGetId(id);
      this.setState({
        isUpdate: false,
        isUpdateBio: false,
        isUpdateName: false,
      });
    });
  };
  resetData = () => {
    this.setState({ isUpdate: false, isUpdateBio: false, isUpdateName: false });
  };
  handleImage = (event) => {
    this.setState({
      formImage: {
        ...this.state.form,
        imageUser: event.target.files[0],
      },
    });
    this.setState({ isUpdateImage: true });
  };
  handleLogout = () => {
    localStorage.removeItem("token");
    window.confirm("Yakin Ingin Keluar ?");
    this.props.history.push("/");
  };
  render() {
    const { akun_add_id, akun_name, akun_phone, akun_bio, akun_image } =
      this.props.data;
    // console.log(this.state.form);
    console.log(this.props.user.data[0]);
    return (
      <>
        <Col sm={3} className={styles.mainCol}>
          <Card className={styles.mainCard}>
            <Row>
              {this.state.isUpdate ||
                this.state.isUpdateName ||
                this.state.isUpdateBio ||
                this.state.isUpdateImage ? (
                <>
                  <Col xs={2}>
                    <img
                      alt=""
                      src={back}
                      onClick={
                        this.state.isUpdateImage
                          ? (event) => this.updateDataImage(event)
                          : (event) => this.updateData(event)
                      }
                      className={styles.imgBackUpdate}
                    />
                  </Col>
                  <Col xs={8}>
                    <Card.Text className={styles.profileId}>
                      {akun_add_id}
                    </Card.Text>
                  </Col>
                  <Col xs={2}>
                    <img
                      alt=""
                      src={resetBack}
                      onClick={this.resetData}
                      className={styles.imgResetBack}
                    />
                  </Col>
                </>
              ) : (
                <>
                  {" "}
                  <Col xs={3}>
                    <img
                      alt=""
                      src={back}
                      onClick={this.props.back}
                      className={styles.imgBack}
                    />
                  </Col>
                  {/* <Col xs={8}>
                    <Card.Text className={styles.profileId}>
                      {akun_add_id}
                    </Card.Text>
                  </Col> */}
                </>
              )}
            </Row>

            <Card className={styles.cardProfile}>
              <label for="file">
                <input
                  type="file"
                  id="file"
                  onChange={(event) => this.handleImage(event)}
                />
                <div>
                  {this.props.user.isError && (
                    <Alert variant="danger" className={styles.alertImage}>
                      {this.props.user.msg}
                    </Alert>
                  )}
                  <Card.Img
                    src={`http://localhost:3009/backend3/api/${akun_image}`}
                    variant="top"
                    className={styles.profileImg}
                  />
                </div>
              </label>

              <Card.Body>
                <Card.Text
                  className={styles.profileName}
                  onClick={this.handleUpdateName}
                >
                  {this.state.isUpdateName ? (
                    <Form>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder={akun_name}
                          value={this.state.form.userName}
                          name="userName"
                          className={styles.controlTextIdName}
                          onChange={(event) => this.changeText(event)}
                        />
                      </Form.Group>
                    </Form>
                  ) : (
                    akun_name
                  )}
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
                  <Form onSubmit={(event) => this.updatePhone(event)}>
                    {this.props.user.isError && (
                      <Alert variant="danger" className={styles.alertPhone}>
                        {this.props.user.msg}
                      </Alert>
                    )}
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
                        value={this.state.form.userAddId}
                        name="userAddId"
                        className={styles.controlTextIdAddId}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  "@" + akun_add_id
                )}
              </Card.Text>

              <Card.Text className={styles.userName}>Username</Card.Text>
              <Card.Text className={styles.textId} onClick={this.handleBio}>
                {this.state.isUpdateBio ? (
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder={akun_bio}
                        value={this.state.form.userBio}
                        name="userBio"
                        className={styles.controlTextBio}
                        onChange={(event) => this.changeText(event)}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  akun_bio
                )}
              </Card.Text>
              <Card.Text className={styles.userName}>Bio</Card.Text>

              <Card.Title className={styles.title}>Settings</Card.Title>
              <Row className={styles.clickChange}>
                <Col xs={2}>
                  <img alt="" src={reset} className={styles.reset} />
                </Col>
                <Col
                  xs={10}
                  className={styles.changePass}
                  onClick={this.handleLogout}>
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

const mapDispatchToProps = { updatePhone, getDataId, updateData, updateImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
