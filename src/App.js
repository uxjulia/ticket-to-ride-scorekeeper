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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainTrack } from "@fortawesome/pro-regular-svg-icons";

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

  const handleLongestRoad = (e) => {
    if (e.target.checked) {
      handleScore("Acheived longest road", 10);
    } else {
      handleScore("Lost longest road", -Math.abs(10));
    }
  };
  return (
    <Box p={2}>
      <Header title="Ticket to Ride - Score Keeper" />
      <Box
        sx={{
          position: "sticky",
          top: "10px",
          backgroundColor: "#ffffff",
          zIndex: "2",
        }}
        className="container"
      >
        <div className="col">
          <Scoreboard score={score} />
        </div>
      </Box>
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
              <Card
                sx={{
                  backgroundColor: "#d9e9d9",
                  paddingRight: "1rem",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  marginBottom: "1rem",
                }}
                variant="outlined"
              >
                <Box className="d-flex justify-content-end align-items-center">
                  <FormControlLabel
                    control={<Switch onChange={handleLongestRoad} />}
                    label={
                      <>
                        <FontAwesomeIcon className="me-2" icon={faTrainTrack} />
                        Longest Path
                      </>
                    }
                    labelPlacement="start"
                  />
                </Box>
              </Card>
              <Destination handleScore={handleScore} key={reset} />
              <HistoryLog history={history} />
              <Button
                variant="contained"
                fullWidth
                onClick={handleReset}
                key="reset"
                id="reset"
              >
                Start New Game
              </Button>
            </div>
          </div>
        </CustomTheme>
      </div>
    </Box>
  );
}
// TODO: Add a confirmation dialog when starting a new game
export default App;
