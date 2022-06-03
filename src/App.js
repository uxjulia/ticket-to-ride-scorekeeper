import React from "react";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import CustomTheme from "./theme";
import ScoreInput from "./components/ScoreInput";
import HistoryLog from "./components/HistoryLog";
import Scoreboard from "./components/Scoreboard";
import Destination from "./components/Destination";
import Header from "./components/Header";
import { Box } from "@mui/material";
// Game events:
// Claim a route
// Complete a destination card
// Achieve longest road

const HistoryEvent = (id, event, points) => {
  const date = new Date();
  let y = date.toLocaleDateString();
  let x = date.toLocaleTimeString();
  return {
    date: y,
    time: x,
    id: id,
    event: event,
    points: +points,
    description: `${event} for ${points} points`,
  };
};

function App() {
  const [numOfEvents, setNumOfEvents] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [history, setHistory] = React.useState([]);
  const [reset, setReset] = React.useState(new Date());

  const handleHistory = (event, points) => {
    let newEvent = HistoryEvent(numOfEvents, event, points);
    setHistory([newEvent, ...history]);
    let x = numOfEvents;
    x += 1;
    setNumOfEvents(x);
  };

  const handleScore = (event, points) => {
    let p = +points;
    setScore(score + p);
    handleHistory(event, p);
  };

  const handleUndo = () => {
    let newHistory = history.slice(1, history.length);
    let newScore = score - history[history.length - 1].points;
    setHistory(newHistory);
    setScore(newScore);
  };

  const handleReset = () => {
    setReset(new Date());
    setNumOfEvents(0);
    setScore(0);
    setHistory([]);
  };
  return (
    <Box p={2}>
      <Header title="Ticket to Ride - Score Keeper" />
      <div className="container">
        <div className="col">
          <Scoreboard score={score} />
        </div>
      </div>
      <div className="container mt-3 mb-4">
        <CustomTheme>
          <div className="row">
            <div className="col-md-6">
              <ScoreInput
                onClick={handleScore}
                handleUndo={handleUndo}
                handleReset={handleReset}
              />
            </div>
            <div className="col-md-6">
              <Destination handleScore={handleScore} key={reset} />
              <HistoryLog history={history} />
            </div>
          </div>
        </CustomTheme>
      </div>
    </Box>
  );
}

export default App;
