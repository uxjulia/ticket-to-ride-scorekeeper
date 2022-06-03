import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const Scoreboard = ({ score }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: "10px",
        backgroundColor: "#ffffff",
        zIndex: "2",
      }}
    >
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#292e3a", color: "#ffffff" }}
      >
        <CardContent>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontFamily: "monospace" }}
          >
            {score}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Scoreboard;
