import { useState } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";

import styles from "./ForgotPassword.module.css";

import Back from "../../../assets/img/back.png";

function ForgotPassword(props) {
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/chat");
  };

  const changeText = (event) => {
    setUsername(event.target.value);
  };
  const handleBack = () => {
    props.history.push("/");
  };
  return (
    <>
      <Container className={styles.main} fluid>
        <Card className={styles.mainCard}>
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
                <h1 className={styles.login}>Forgot Password</h1>
              </Col>
            </Row>

            <p className={styles.subLogin}>
              You’ll get messages soon on your e-mail{" "}
            </p>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className={styles.everyLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="telegram@mail.com"
                  value={username}
                  onChange={(event) => changeText(event)}
                  className={styles.everyControl}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={styles.btnSubmit}
              >
                Send
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ForgotPassword;
