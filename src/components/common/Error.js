import React from "react";
import Alert from "@mui/material/Alert";

export default function Error({ message }) {
  return (
    <div>
      <Alert severity="error">{message}</Alert>
    </div>
  );
}
