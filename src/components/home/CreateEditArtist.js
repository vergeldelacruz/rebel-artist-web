import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GET_ARTIST } from "../../graphql/Queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ARTIST, UPDATE_ARTIST } from "../../graphql/Mutations";
import FeedBackSnackbar from "../common/FeedBackSnackbar";
import Error from "../common/Error";

export default function CreateEditArtist() {
  const navigate = useNavigate();
  let { artistId } = useParams();
  const MAX_NAME_LENGTH = 400;
  const mode = artistId === undefined ? "Add" : "Edit";
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [streamCount, setStreamCount] = useState("");
  const [paidStatus, setPaidStatus] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [getArtist, { error, loading, data }] = useLazyQuery(GET_ARTIST, {
    fetchPolicy: "network-only",
  });

  const clearForm = () => {
    setName("");
    setRate("");
    setStreamCount("");
    setPaidStatus(false);
    setFormErrors([]);
  };
  const onClose = () => {
    clearForm();
    navigate(-1);
  };
  const validateForm = () => {
    let temp = {};
    temp.name = name ? "" : "This field is required.";
    if (temp.name === "")
      temp.name =
        name.length > MAX_NAME_LENGTH
          ? "Maximum length exceeds " + MAX_NAME_LENGTH + " characters."
          : "";
    temp.rate = rate ? "" : "This field is required.";
    temp.streamCount = streamCount ? "" : "This field is required.";
    setFormErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const onSave = () => {
    setDisabledButtons(true);
    if (validateForm()) {
      if (mode === "Add") {
        createArtist({
          variables: {
            name: name,
            rate: parseFloat(rate),
            streamCount: parseInt(streamCount),
            paidStatus: paidStatus,
          },
        });
      } else {
        updateArtist({
          variables: {
            id: artistId,
            name: name,
            rate: parseFloat(rate),
            streamCount: parseInt(streamCount),
            paidStatus: paidStatus,
          },
        });
      }
    } else {
      setDisabledButtons(false);
    }
  };
  useEffect(() => {
    if (data) {
      setName(data.artistById.name);
      setRate(data.artistById.rate);
      setStreamCount(data.artistById.streamCount);
      setPaidStatus(data.artistById.paidStatus);
    }
  }, [data]);

  useEffect(() => {
    if (artistId) {
      getArtist({ variables: { artistId: artistId } });
    } else {
      clearForm();
    }
  }, [artistId, getArtist]);

  const [updateArtist] = useMutation(UPDATE_ARTIST, {
    onCompleted: ({ updateArtist }) => {
      setSnackbarMessage("Artist updated successfully");
      setOpenSnack(true);
      setTimeout(() => {
        navigate("/artists");
      }, 1000);
    },
    onError: (errors) => {
      const error = `${errors}`.split(":").reverse()[0];
      let temp = {};
      temp.email = error;
      setFormErrors({ ...temp });
    },
  });

  const [createArtist] = useMutation(CREATE_ARTIST, {
    onCompleted: ({ createArtist }) => {
      setSnackbarMessage("Artist created successfully");
      setOpenSnack(true);
      setTimeout(() => {
        navigate("/artists");
      }, 1000);
    },
    onError: (errors) => {
      const error = `${errors}`.split(":").reverse()[0];
      let temp = {};
      temp.email = error;
      setFormErrors({ ...temp });
    },
  });

  return (
    <>
      {error && <Error message="Unable to find the artist"></Error>}
      {!error && (
        <>
          <FeedBackSnackbar
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
            message={snackbarMessage}
          ></FeedBackSnackbar>
          <h2> {mode === "Add" ? "Create" : "Update"} Artist</h2>
          <form>
            <Grid container alignItems="baseline" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  size="small"
                  type="text"
                  id="name"
                  label="Artist Name*"
                  fullWidth
                  value={name}
                  inputProps={{ maxLength: MAX_NAME_LENGTH }}
                  onChange={(e) => setName(e.target.value)}
                  {...(formErrors.name && {
                    error: true,
                    helperText: formErrors.name,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  size="small"
                  id="rate"
                  label="Rate*"
                  fullWidth
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  {...(formErrors.rate && {
                    error: true,
                    helperText: formErrors.rate,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  size="small"
                  id="streamCount"
                  label="# Streams*"
                  fullWidth
                  type="number"
                  value={streamCount}
                  onChange={(e) => setStreamCount(e.target.value)}
                  {...(formErrors.streamCount && {
                    error: true,
                    helperText: formErrors.streamCount,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={paidStatus}
                        onChange={(e) => setPaidStatus(e.target.checked)}
                        name="active"
                        color="primary"
                      />
                    }
                    label="Paid"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onClose}
                    color="secondary"
                    disabled={disabledButtons}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onSave}
                    color="secondary"
                    disabled={disabledButtons}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </>
  );
}
