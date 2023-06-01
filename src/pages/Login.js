import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
    }
  };

  return (
    <React.Fragment>
      <h2>Login Form</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container alignItems="baseline" spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              size="small"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="email"
              fullWidth
              value={email}
              error={emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              size="small"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={password}
              error={passwordError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <small>
        Need an account? <Link to="/register">Register here</Link>
      </small>
    </React.Fragment>
  );
};

export default Login;
