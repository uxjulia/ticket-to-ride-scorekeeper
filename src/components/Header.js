import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAbacus } from "@fortawesome/pro-duotone-svg-icons";

const Wrapper = styled.div`
@media only screen and (max-width: 767px) {
  div.hideForMobile {
    display: none;
  }
})`;

const Header = ({ title }) => {
  return (
    <Wrapper>
      <div className="hideForMobile mb-3">
        <header className="site-header d-flex align-items-center">
          <Typography component="span" color="primary">
            <FontAwesomeIcon icon={faAbacus} size="2x" className="me-2" />
          </Typography>
          <div className="wrapper">
            <Typography variant="h5">{title}</Typography>
          </div>
        </header>
      </div>
    </Wrapper>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
