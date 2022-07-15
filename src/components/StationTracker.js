import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";

const StationTracker = ({ handleScore }) => {
  const [value, setValue] = React.useState("");

  const handleValue = (event, newValue) => {
    let nScore = newValue !== null ? newValue : 0;
    setValue(nScore);
    handleScore(`Kept ${nScore} stations`, nScore, "station");
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
          <Typography variant="button">Stations Kept</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="mb-3">
            <ToggleButtonGroup
              value={value}
              exclusive
              onChange={handleValue}
              aria-label="text Value"
            >
              <ToggleButton value={4} aria-label="1">
                One
              </ToggleButton>
              <ToggleButton value={8} aria-label="2">
                Two
              </ToggleButton>
              <ToggleButton value={12} aria-label="3">
                Three
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div p={2}>
            <Typography variant="body2" color="#7c7c7c">
              For use with expansion sets that use Train Stations. Each kept
              station is worth 4 points.
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

StationTracker.propTypes = {
  handleScore: PropTypes.func.isRequired,
};
export default StationTracker;
