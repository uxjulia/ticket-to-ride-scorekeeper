import React from "react";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import CustomTheme from "./theme";
import ScoreInput from "./components/ScoreInput";
import HistoryLog from "./components/HistoryLog";
import Scoreboard from "./components/Scoreboard";
import Destination from "./components/Destination";
import StationTracker from "./components/StationTracker";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainTrack, faRotateLeft } from "@fortawesome/pro-regular-svg-icons";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  button#undo {
    background-color: rgba(193, 160, 160, 0.8);
    color: #333333;
  }
`;

const HistoryEvent = (id, event, points, type) => {
  const date = new Date();
  let y = date.toLocaleDateString();
  let x = date.toLocaleTimeString();
  return {
    date: y,
    time: x,
    id: id,
    event: event,
    type: type,
    points: +points,
    description: `${event} for ${points} points`,
  };
};

function App() {
  const [numOfEvents, setNumOfEvents] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [history, setHistory] = React.useState([]);
  const [reset, setReset] = React.useState(new Date());
  const [destinationPoints, setDestinationPoints] = React.useState(0);
  const [stationPoints, setStationPoints] = React.useState(0);
  const [stealthMode, setStealthMode] = React.useState(false);

  React.useEffect(() => {
    let x = getDestinationPoints();
    setDestinationPoints(x);
  }, [numOfEvents]);

  const getDestinationPoints = () => {
    let dPoints = history.map((event) => {
      return event.type === "destination" ? event.points : 0;
    });
    let sum = dPoints.length === 0 ? 0 : dPoints.reduce((a, b) => a + b, 0);
    return sum;
  };

  const handleHistory = (event, points, type) => {
    let newEvent = HistoryEvent(numOfEvents, event, points, type);
    setHistory([newEvent, ...history]);
    let x = numOfEvents;
    x += 1;
    setNumOfEvents(x);
  };

  const handleScore = (event, points, type = "route") => {
    let p = +points;
    setScore(score + p);
    handleHistory(event, p, type);
  };

  const handleStationPoints = (e, p, t) => {
    setStationPoints(p);
    handleHistory(e, p, t);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const eventHistory = history;
    const lastEvent = eventHistory[0];
    let idx = 0;
    if (lastEvent.type !== "route") {
      idx = eventHistory.findIndex((e) => e.type === "route");
    }
    if (idx !== -1) {
      let newScore = score - eventHistory[idx].points;
      eventHistory.splice(idx, 1);
      setHistory(eventHistory);
      setScore(newScore);
    }
  };

  const handleReset = () => {
    setReset(new Date());
    setNumOfEvents(0);
    setScore(0);
    setHistory([]);
  };

  const handleLongestRoad = (e) => {
    if (e.target.checked) {
      handleScore("Acheived longest path", 10, "path");
    } else {
      handleScore("Lost longest path", -Math.abs(10), "path");
    }
  };

  return (
    <Wrapper>
      <Box p={2}>
        <Header title="Ticket to Ride - Score Keeper" />
        <Box
          sx={{
            paddingTop: "10px",
            paddingBottom: "10px",
            position: "sticky",
            top: "0",
            left: "0",
            right: "0",
            backgroundColor: "#ffffff",
            zIndex: "2",
          }}
          className="container"
        >
          <div className="col">
            {stealthMode ? (
              <Scoreboard
                score={
                  score - destinationPoints < 0 ? 0 : score - destinationPoints
                }
              />
            ) : (
              <Scoreboard score={score + stationPoints} />
            )}
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
                  className="d-flex justify-content-end align-items-center"
                  sx={{
                    backgroundColor: "#d9e9d9",
                    paddingRight: "1rem",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    mb: ".5rem",
                  }}
                  variant="outlined"
                >
                  <FormControlLabel
                    key={reset}
                    control={<Switch onChange={handleLongestRoad} />}
                    label={
                      <>
                        <FontAwesomeIcon className="me-2" icon={faTrainTrack} />
                        Longest Path
                      </>
                    }
                    labelPlacement="start"
                  />
                </Card>
                <Button
                  className="my-2"
                  color="light"
                  fullWidth
                  variant="contained"
                  onClick={handleUndo}
                  id="undo"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="me-2" />
                  Undo Route
                </Button>
                <Box my={1}>
                  <Destination
                    stealthMode={stealthMode}
                    setStealthMode={setStealthMode}
                    points={destinationPoints}
                    handleScore={handleScore}
                    key={reset}
                  />
                </Box>
                <StationTracker handleScore={handleStationPoints} />
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
    </Wrapper>
  );
}
// TODO: Add a confirmation dialog when starting a new game
export default App;
