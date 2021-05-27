import { useState } from "react";
import { Button, Container, Form, Card, Image, Row, Col } from "react-bootstrap";
import styles from "./Login.module.css"
import gambar from "../../../assets/img/Vector.png"

function Login(props) {
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/chat");
  };
  // handleLogin = (event) => {
  //   event.preventDefault();
  //   this.props
  //     .login(this.state.form)
  //     .then((result) => {
  //       localStorage.setItem("token", this.props.auth.data.token);

  //       const { role } = this.props.auth.data;
  //       const { getRecruiterById, getWorkerById } = this.props;

  //       if (role === "recruiter") {
  //         const { recruiter_id } = this.props.auth.data;
  //         getRecruiterById(recruiter_id);
  //         localStorage.setItem("recId", this.props.auth.data.recruiter_id);
  //         this.props.history.push("/home");
  //       } else {
  //         const { worker_id } = this.props.auth.data;
  //         getWorkerById(worker_id);
  //         localStorage.setItem("workerId", this.props.auth.data.worker_id);
  //         this.props.history.push(`/worker/edit?id=${worker_id}`);
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ isError: true });
  //       setTimeout(() => {
  //         this.setState({ isError: false });
  //       }, 5000);
  //     });
  // };


  const changeText = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Container fluid className={styles.bg}>
        <div>
          <Card className={`${styles.border} mt-5 mx-auto `} style={{ width: "25rem" }}>
            <Card.Body>
              <h1 className={styles.colorlogin}>Login</h1>
              <hr />
              <p> Hi, Welcome back!</p>
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <p className={styles.textright}> Forgot Password? </p>
                <Button className={styles.button} type="submit">
                  Submit
                </Button>
                <br />
                <br />
                <Row>
                  <Col><hr /></Col>
                  <Col className={styles.center}>Login With</Col>
                  <Col><hr /></Col>
                </Row>
                <br />
                <Button variant="outline-info" className={styles.buttonBorder} type="submit">
                  <Image src={gambar} /> Google
                </Button>
                <br />
                <br />
                <p className={styles.center}>Don’t have an account? Sign Up</p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Login;
