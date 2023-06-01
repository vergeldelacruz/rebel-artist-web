import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <React.Fragment>
    <h2>My Profile</h2>
    <form onSubmit={handleSubmit} action={<Link to="/login" />}>
      <Grid container alignItems="baseline" spacing={2}>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            size="small"
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            size="small"
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            size="small"
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            size="small"
            type="password"
            variant="outlined"
            color="secondary"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" type="submit">
            Update
          </Button>
        </Grid>
      </Grid>
    </form>

  </React.Fragment>
  )
}

