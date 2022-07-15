import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { faVanShuttle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const Wrapper = styled.div`
  button p {
    font-family: monospace;
  }
  button {
    max-height: 50px;
    min-height: 50px;
  }

  button#undo {
    background-color: rgba(193, 160, 160, 0.8);
    color: #333333;
  }
`;

const ScoreInput = ({ onClick }) => {
  const handleClick = (score) => {
    const event = "Claimed a route";
    const type = "route";
    onClick(event, score, type);
  };
  return (
    <Wrapper className="mb-2">
      <Button
        key="1"
        className="mb-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(1)}
        id={1}
      >
        <Typography mr={2}>1 - (1 pt)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
      <Button
        key="2"
        className="my-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(2)}
        id={2}
      >
        <Typography mr={2}>2 - (2 pts)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
      <Button
        key="4"
        className="my-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(4)}
        id={4}
      >
        <Typography mr={2}>3 - (4 pts)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
      <Button
        key="7"
        className="my-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(7)}
        id={7}
      >
        <Typography mr={2}>4 - (7 pts)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
      <Button
        key="10"
        className="my-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(10)}
        id={21}
      >
        <Typography mr={2}>5 - (10 pts)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
      <Button
        key="15"
        className="my-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(15)}
        id={15}
      >
        <Typography mr={1}>6 - (15 pts)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
      <Button
        key="21"
        className="my-2 ps-4 justify-content-between"
        color="light"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleClick(21)}
        id={21}
      >
        <Typography mr={1}>8 - (21 pts)</Typography>
        <div className="d-inline-flex justify-content-end">
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
          <FontAwesomeIcon icon={faVanShuttle} className="me-1" />
        </div>
      </Button>
    </Wrapper>
  );
};
export default ScoreInput;

ScoreInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};
