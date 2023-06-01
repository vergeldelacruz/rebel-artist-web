import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

export default function ConfirmDialog({ title,message,open, onYes,onNo}) {

  return (
    <Dialog open={open} onClose={onNo} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Alert
        severity="warning"
        >{message}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={onNo}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={onYes}
          color="secondary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
