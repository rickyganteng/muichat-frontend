import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import { register } from "../../../redux/action/auth";

import styles from "./Register.module.css";

import Back from "../../../assets/img/back.png";
import pass from "../../../assets/img/Vector (4).png";

function Register(props) {
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [password, setPassword] = useState(false);
  const [click, setClick] = useState(0);

  const handleRegister = (event) => {
    // console.log(form);
    event.preventDefault();
    props.register(form).then((res) => {
      props.history.push("/");
    });
  };

  const changeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleBack = () => {
    props.history.push("/");
  };
  const handlePass = () => {
    setPassword(true);
    setClick(click + 1);
    if (click % 2) {
      setPassword(true);
    } else {
      setPassword(false);
    }
  };
  return (
    <>
      <Container className={styles.main} fluid>
        {props.auth.isLoading ? (
          <Spinner animation="grow" className={styles.loading} />
        ) : (
          <Card
            className={props.auth.isError ? styles.mainCard1 : styles.mainCard}
          >
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <img
                    alt="back"
                    src={Back}
                    onClick={handleBack}
                    className={styles.btnBack}
                  />
                </Col>
                <Col xs={11}>
                  <h1 className={styles.login}>Register</h1>
                </Col>
              </Row>

              <p className={styles.subLogin}>Let’s create your account!</p>
              <Form onSubmit={handleRegister}>
                {props.auth.isError && (
                  <Alert variant="danger" className={styles.alert}>
                    <h1 className={styles.error}>{props.auth.msg}</h1>
                  </Alert>
                )}
                <Form.Group className="mb-3">
                  <Form.Label className={styles.everyLabel}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Your Name"
                    value={form.userName}
                    name="userName"
                    onChange={(event) => changeText(event)}
                    className={styles.everyControl}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className={styles.everyLabel}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Your Mail"
                    value={form.userEmail}
                    name="userEmail"
                    onChange={(event) => changeText(event)}
                    className={styles.everyControl}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={styles.everyLabel}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type={password ? "text" : "password"}
                    placeholder="Password"
                    className={styles.everyControl}
                    value={form.userPassword}
                    name="userPassword"
                    required
                    onChange={(event) => changeText(event)}
                  />
                  <img
                    alt=""
                    src={pass}
                    className={styles.pass}
                    onClick={handlePass}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className={styles.btnSubmit}
                >
                  Register
                </Button>
              </Form>
              <p className={styles.loginWith}>Register with</p>
              <Button
                variant="primary"
                type="submit"
                className={styles.btnSubmitGoogle}
              >
                Google
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
