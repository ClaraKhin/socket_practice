import { useState, useEffect } from "react";
import io from "socket.io-client";
import Input from "./component/Input";

import "./App.css";

function App() {
  const [scores, setScores] = useState({});
  const socket = io("http://localhost:3000");
  function connectSocket() {
    socket.on("connect", () => {
      console.log("Connected to Server", socket.id);
    });
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let currentObj = { [name]: value };
    setScores((prev) => ({ ...prev, ...currentObj }));
  };

  const sendScores = () => {
    socket.emit("scores", scores);
    socket.on("playerScores", (playerScores) => {
      console.log(playerScores);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div>
      <h1>React MultiPlayer Dashboard</h1>
      <Input
        name="name"
        placeholder="Enter Your Name"
        onChange={handleInputChange}
      />
      <Input
        name="score"
        placeholder="Enter Your Score"
        onChange={handleInputChange}
      />
      <button className="send-scores" onClick={sendScores}>
        Publish Score
      </button>
    </div>
  );
}

export default App;
