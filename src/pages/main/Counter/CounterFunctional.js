import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Button, Container } from "react-bootstrap";

// WITHOUT REDUX ===========================================================================
function Counter() {
  const [count, setCount] = useState(0)
  //index 0 digunakan untuk pengambilan data
  //index 1 digunaakan untuk memanipulasi data di index 0

  useEffect(() => {
    console.log("Get Data")
  }, []);

  useEffect(() => {
    console.log("counter is Update")
  }, [count]);

  const increaseCounter = () => {
    setCount(count + 1);
  };
  const decreaseCounter = () => {
    setCount(count - 1);
  };
  return (
    <>
      <Container className="text-center">
        <Navbar />
        <h1>Counter</h1>
        <hr />
        <h3>{count}</h3>
        <Button variant="primary" onClick={decreaseCounter}>-</Button>
        <Button variant="secondary" className="mx-2">
          RESET
        </Button>
        <Button variant="primary" onClick={increaseCounter}>+</Button>
      </Container>
    </>
  );
}

export default Counter;

// WITH REDUX ===========================================================================
// function Counter() {
//   return (
//     <>
//       <Container className="text-center">
//         <Navbar />
//         <h1>Counter</h1>
//         <hr />
//         <h3>0</h3>
//         <Button variant="primary">-</Button>
//         <Button variant="secondary" className="mx-2">
//           RESET
//         </Button>
//         <Button variant="primary">+</Button>
//       </Container>
//     </>
//   );
// }

// export default Counter;
