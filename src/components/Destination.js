import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
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
} from "@fortawesome/pro-regular-svg-icons";
import CustomInput from "./CustomInput";
import { Button } from "@mui/material";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";

const Destination = ({ handleScore }) => {
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(true);
  const handleCheck = (e) => {
    if (e.target.checked) {
      handleScore("Reached desination", value);
    } else {
      handleScore("Undo reaching destination", -Math.abs(value));
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="mb-3">
      <Box>
        <CustomInput
          type={show ? "number" : "password"}
          fullWidth
          label="Destination Value"
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
                    <FontAwesomeIcon icon={faEyeSlash} size="xs" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size="xs" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="d-flex justify-content-end align-items-center mt-1">
        <FormControlLabel
          control={<Switch onChange={handleCheck} />}
          label="Complete"
          labelPlacement="start"
        />
      </Box>
    </div>
  );
};

const DestinationContainer = (props) => {
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

Destination.propTypes = {
  handleScore: PropTypes.func.isRequired,
};

export default DestinationContainer;
