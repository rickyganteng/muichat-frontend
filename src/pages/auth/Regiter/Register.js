import { useState } from "react";
import { Button, Container, Form, Card, Image, Row, Col } from "react-bootstrap";
import styles from "./Register.module.css"
import gambar from "../../../assets/img/Vector.png"

function Register(props) {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    localStorage.setItem("password", userpassword);

    props.history.push("/chat");
  };

  const changeText = (event) => {
    setUsername(event.target.value);
    setUserpassword(event.target.value);
    console.log('aaaaa', event.target.value)

  };

  return (
    <>
      <Container fluid className={styles.bg}>
        <div>
          <Card className={`${styles.border} mt-5 mx-auto `} style={{ width: "25rem" }}>
            <Card.Body>
              <h1 className={styles.colorlogin}>Register</h1>
              <hr />
              <p> Let’s create your account!</p>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={userpassword}
                    onChange={(event) => changeText(event)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 border-bottom">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <br />
                <Button className={styles.button} type="submit">
                  Submit
                </Button>
                <br />
                <br />
                <Row>
                  <Col><hr /></Col>
                  <Col className={styles.center}>Register With</Col>
                  <Col><hr /></Col>
                </Row>
                <br />
                <Button variant="outline-info" className={styles.buttonBorder} type="submit">
                  <Image src={gambar} /> Google
                </Button>
                <br />
                <br />
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Register;
