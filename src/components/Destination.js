import React from "react";
// import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faEye,
  faEyeSlash,
} from "@fortawesome/pro-regular-svg-icons";
import CustomInput from "./CustomInput";

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
  return (
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
      </AccordionDetails>
    </Accordion>
  );
};

Destination.propTypes = {
  handleScore: PropTypes.func.isRequired,
};

export default DestinationContainer;
