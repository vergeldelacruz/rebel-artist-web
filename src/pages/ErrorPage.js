import React from "react";
import Alert from "@mui/material/Alert";

export default function ErrorPage() {
  return (
      <Alert severity="error">
        <p>An unexpected error has occurred. Please try again later. </p>
      </Alert>
  );
}
