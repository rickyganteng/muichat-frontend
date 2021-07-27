import { useState } from "react";
import { Button, Container, Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";

import pass from "../../../assets/img/Vector (4).png";

function Login(props) {
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });
  const [password, setPassword] = useState(false);
  const [click, setClick] = useState(0);

  const handleLogin = (event) => {
    // console.log(form);
    event.preventDefault();
    props.login(form).then((res) => {
      console.log(res.value.data.data)
      //       console.log(this.props.auth.data.akun_name)
      const token = res.action.payload.data.data.token;
      const userId = res.action.payload.data.data.akun_id;
      const userName = res.action.payload.data.data.akun_name;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      props.history.push("/chat");
    });
  };

  const changeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
  console.log(props);
  return (
    <>
      <Container className={styles.main} fluid>
        <Card
          className={props.auth.isError ? styles.mainCard1 : styles.mainCard}
        >
          <Card.Body>
            <h1 className={styles.login}>Login</h1>
            <p className={styles.subLogin}>Hi, Welcome back!</p>
            <Form onSubmit={handleLogin}>
              {props.auth.isError && (
                <Alert variant="danger" className={styles.alert}>
                  <h1 className={styles.error}>{props.auth.msg}</h1>
                </Alert>
              )}
              <Form.Group className="mb-3">
                <Form.Label className={styles.everyLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your Mail"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={(event) => changeText(event)}
                  className={styles.everyControl}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className={styles.everyLabel}>Password</Form.Label>
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
                <Link to="/forgot-password" className={styles.forgot}>
                  Forgot Password ?
                </Link>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={styles.btnSubmit}
              >
                Login
              </Button>
            </Form>
            <p className={styles.loginWith}>Login with</p>
            <Button
              variant="primary"
              type="submit"
              className={styles.btnSubmitGoogle}
            >
              Google
            </Button>
            <p className={styles.signUp}>
              Don’t have an account?
              <Link to="/register" className={styles.linkSignUp}>
                {" "}
                Sign Up
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
