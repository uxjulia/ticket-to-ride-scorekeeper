import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Wrapper = styled.div`
  .event:first-of-type {
    font-weight: bold;
  }
  p {
    margin-bottom: unset !important;
  }
`;

const HistoryLog = ({ history }) => {
  return (
    <Box mb={3}>
      <Accordion
        disableGutters
        defaultExpanded
        square={true}
        variant="outlined"
      >
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
          <Typography variant="button">History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {history.length ? (
            <Wrapper>
              {history.map((event) => (
                <Typography variant="body2" className="event" key={event.id}>
                  {event.time}: {event.description}
                </Typography>
              ))}
            </Wrapper>
          ) : (
            <Typography variant="body2" color="#495057">
              Nothing to see here.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

HistoryLog.propTypes = {
  history: PropTypes.array.isRequired,
};

export default HistoryLog;
