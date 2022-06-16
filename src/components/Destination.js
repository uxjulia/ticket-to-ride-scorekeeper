import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faEye,
  faEyeSlash,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/pro-regular-svg-icons";
import CustomInput from "./CustomInput";
import { Button } from "@mui/material";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import Slider from "@mui/material/Slider";

const marks = [
  { value: 0, label: "Failed" },
  { value: 50, label: "-" },
  { value: 100, label: "Completed" },
];

const DestinationSlider = ({ handleChange }) => {
  return (
    <Box>
      <Slider
        aria-label="Destination"
        defaultValue={50}
        getAriaValueText={(value) => value}
        valueLabelDisplay="off"
        step={null}
        marks={marks}
        track={false}
        onChangeCommitted={handleChange}
      />
    </Box>
  );
};

DestinationSlider.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

const Destination = ({ id, handleScore, handlePossiblePoints }) => {
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(0);
  const handleInput = (points) => {
    setValue(points);
    handlePossiblePoints(id, points);
  };
  const handleChange = (e, val) => {
    if (val === 100) {
      if (status === -1) {
        let nScore = value * 2;
        handleScore("Reached desination", nScore, "destination");
      }
      if (status === 0) {
        handleScore("Reached desination", value, "destination");
      }
      setStatus(1);
    } else if (val === 50) {
      if (status === 1) {
        handleScore(
          "Undo reaching destination",
          -Math.abs(value),
          "destination"
        );
      }
      if (status === -1) {
        handleScore("Undo failed destination", value, "destination");
      }
      setStatus(0);
    } else if (val === 0) {
      if (status === 1) {
        let nScore = value * 2;
        handleScore(
          "Failed to reach destination",
          -Math.abs(nScore),
          "destination"
        );
      }
      if (status === 0) {
        handleScore(
          "Failed to reach destination",
          -Math.abs(value),
          "destination"
        );
      }
      setStatus(-1);
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="mb-3">
      <Box className="d-flex align-items-center">
        <Box className="me-1"></Box>
        <Box className="w-100">
          <CustomInput
            autoComplete="off"
            type={show ? "number" : "password"}
            fullWidth
            label="Point Value"
            onChange={(e) => handleInput(e.target.value)}
            value={value}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShow(!show)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {show ? (
                      <FontAwesomeIcon icon={faEyeSlash} size="2xs" />
                    ) : (
                      <FontAwesomeIcon icon={faEye} size="2xs" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      {value !== "" && (
        <Box
          sx={{
            margin: "auto",
            width: "80%",
            marginBottom: "2rem",
            marginTop: "1rem",
          }}
        >
          <DestinationSlider handleChange={handleChange} />
        </Box>
      )}
    </div>
  );
};

const DestinationContainer = ({
  points,
  stealthMode,
  setStealthMode,
  handleScore,
}) => {
  const [count, setCount] = React.useState(3);
  const [possiblePointsArr, setPossiblePointsArr] = React.useState([]);
  const [possiblePoints, setPossiblePoints] = React.useState(0);
  const handleAdd = () => {
    setCount(count + 1);
  };
  const handlePossiblePoints = (id, points) => {
    console.log("handlePossiblePoints", points);
    let p = +points;
    let arr = possiblePointsArr;
    arr[id] = p;
    console.log(arr);
    setPossiblePointsArr(arr);
    let sum = arr.reduce((a, b) => a + b, 0);
    setPossiblePoints(sum);
  };

  const destinationProps = {
    handleScore: handleScore,
    handlePossiblePoints: handlePossiblePoints,
  };
  return (
    <Box mb={2}>
      <Accordion
        sx={{ marginBottom: "1rem" }}
        disableGutters
        defaultExpanded
        square={true}
        variant="outlined"
      >
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
          <Typography variant="button">Destinations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="mb-4">
            <Typography align="center" color="primary" variant="subtitle2">
              Points from Destinations: {points}/{possiblePoints}
            </Typography>

            <Box className="d-flex justify-content-center align-items-center">
              {stealthMode && (
                <>
                  <IconButton onClick={() => setStealthMode(false)}>
                    <FontAwesomeIcon icon={faToggleOn} size="2xs" />
                  </IconButton>{" "}
                  <Typography variant="subtitle2" component="span">
                    Stealth Mode
                  </Typography>
                </>
              )}
              {!stealthMode && (
                <>
                  <IconButton onClick={() => setStealthMode(true)}>
                    <FontAwesomeIcon icon={faToggleOff} size="2xs" />
                  </IconButton>{" "}
                  <Typography variant="subtitle2" component="span">
                    Stealth Mode
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Destination id={0} {...destinationProps} />
          <Destination id={1} {...destinationProps} />
          <Destination id={2} {...destinationProps} />
          {count > 3 && <Destination id={3} {...destinationProps} />}
          {count > 4 && <Destination id={4} {...destinationProps} />}
          {count > 5 && <Destination id={5} {...destinationProps} />}
          {count > 9 && <Destination id={6} {...destinationProps} />}
          {count > 6 && <Destination id={7} {...destinationProps} />}
          {count > 7 && <Destination id={8} {...destinationProps} />}
          {count > 8 && <Destination id={9} {...destinationProps} />}
          {count < 10 && (
            <Button onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} size="sm" className="me-2" /> Add
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

DestinationContainer.propTypes = {
  points: PropTypes.number.isRequired,
  stealthMode: PropTypes.bool.isRequired,
  setStealthMode: PropTypes.func.isRequired,
  handleScore: PropTypes.func.isRequired,
};

Destination.propTypes = {
  handleScore: PropTypes.func.isRequired,
  handlePossiblePoints: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DestinationContainer;
