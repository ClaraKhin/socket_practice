import { useState, useEffect } from "react";
import io from "socket.io-client";
import Input from "./component/Input";

import "./App.css";

function App() {
  const socket = io("http://localhost:3000");
  function connectSocket() {
    socket.on("connect", () => {
      console.log("Connected to Server", socket.id);
    });
  }
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div>
      <h1>React MultiPlayer Dashboard</h1>
      <Input placeholder="Enter Your Name" />
      <Input placeholder="Enter Your Score" />
    </div>
  );
}

export default App;
