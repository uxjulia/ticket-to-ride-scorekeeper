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

const Destination = ({ handleScore }) => {
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(0);
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
            onChange={(e) => setValue(e.target.value)}
            size="small"
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
  ...props
}) => {
  const [count, setCount] = React.useState(3);
  const handleAdd = () => {
    setCount(count + 1);
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
          {points > 0 && (
            <Box className="d-flex justify-content-between align-content-center mb-4">
              {stealthMode && (
                <Box>
                  <IconButton onClick={() => setStealthMode(false)}>
                    <FontAwesomeIcon icon={faToggleOn} size="2xs" />
                  </IconButton>{" "}
                  <Typography variant="subtitle2" component="span">
                    Stealth Mode
                  </Typography>
                </Box>
              )}
              {!stealthMode && (
                <Box>
                  <IconButton onClick={() => setStealthMode(true)}>
                    <FontAwesomeIcon icon={faToggleOff} size="2xs" />
                  </IconButton>{" "}
                  <Typography variant="subtitle2" component="span">
                    Stealth Mode
                  </Typography>
                </Box>
              )}
              <Typography color="primary" variant="subtitle2" component="span">
                Points from Destinations: {points}
              </Typography>
            </Box>
          )}
          <Destination {...props} />
          <Destination {...props} />
          <Destination {...props} />
          {count > 3 && <Destination {...props} />}
          {count > 4 && <Destination {...props} />}
          {count > 5 && <Destination {...props} />}
          {count > 6 && <Destination {...props} />}
          {count > 7 && <Destination {...props} />}
          {count > 8 && <Destination {...props} />}
          {count > 9 && <Destination {...props} />}
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
};

Destination.propTypes = {
  handleScore: PropTypes.func.isRequired,
};

export default DestinationContainer;
