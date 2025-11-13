import { useState, useEffect } from "react";
import io from "socket.io-client";
import Input from "./component/Input";

import "./App.css";

function App() {
  const [scores, setScores] = useState({});
  const [pScores, setPScores] = useState([]);
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
      setPScores(playerScores);
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
      {pScores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {pScores.map((pScore) => (
              <tr key={pScore?.id}>
                <td>{pScore?.name}</td>
                <td>{pScore?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <></>}
    </div>
  );
}

export default App;
