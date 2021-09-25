import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Chat from "./pages/main/Chat/Chat";

import io from "socket.io-client";
import Register from "./pages/auth/Register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const newSocket = io.connect("https://chatmui.herokuapp.com", {
      path: "/backend3/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connected Socket Client");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute restricted={true} path="/" exact component={Login} />
          <PublicRoute
            restricted={true}
            path="/register"
            exact
            component={Register}
          />
          <PublicRoute
            restricted={true}
            path="/forgot-password"
            exact
            component={ForgotPassword}
          />
          <PrivateRoute socket={socket} path="/chat" exact component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
