import React from "react";
import TextField from "@mui/material/TextField";

const CustomInput = (props) => {
  const inputEl = React.useRef(null);
  const handleFocus = () => {
    inputEl.current.select();
  };
  return <TextField inputRef={inputEl} onFocus={handleFocus} {...props} />;
};

export default CustomInput;
