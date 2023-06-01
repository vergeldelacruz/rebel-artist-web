import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ARTISTS } from "../graphql/Queries";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { DELETE_ARTIST } from "../graphql/Mutations";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/common/ConfirmDialog";
import FeedBackSnackbar from "../components/common/FeedBackSnackbar";

export default function Home() {
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "name", headerName: "Name", width: 150, flex: 1 },
    {
      field: "rate",
      headerName: "Rate",
      width: 100,
      type: "number",
      align: "right",
    },
    {
      field: "streamCount",
      headerName: "# Stream",
      width: 150,
      type: "number",
      align: "right",
    },
    {
      field: "paidStatus",
      headerName: "Paid Status",
      width: 100,
      type: "boolean",
    },
    {
      field: "payoutAmount",
      headerName: "Payout Amount",
      width: 150,
      type: "number",
      align: "right",
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }
        return `$ ${params.value.toLocaleString()}`;
      },
    },
    {
      field: "averageMonthlyPayoutAmount",
      headerName: "Monthly Payout Amount",
      width: 200,
      type: "number",
      align: "right",
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }
        return `$ ${params.value.toLocaleString()}`;
      },
    },
    {
      field: "Action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onEdit = () => {
          navigate("/updateArtist/" + params.id);
        };
        const onDelete = () => {
          setDeleteArtistId(params.id);
          setOpenConfirmDialog(true);
        };
        return (
          <Box>
            <IconButton
              sx={{
                "&:hover, &.Mui-focusVisible": { color: "#9c27b0" },
              }}
              onClick={onEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton sx={{
                "&:hover, &.Mui-focusVisible": { color: "#c62828" },
              }} onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState("");
  const [artists, setArtists] = useState([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [deleteArtistId, setDeleteArtistId] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [refreshArtists, { error, loading, data }] = useLazyQuery(GET_ARTISTS, {
    variables: {},
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      const filteredRows = data.artists.filter((row) => {
        return row.name.toLowerCase().includes(searchString.toLowerCase());
      });
      setArtists(filteredRows);
    }
  }, [data, searchString]);

  useEffect(() => {
    refreshArtists();
  }, [refreshArtists]);

  const [deleteArtist] = useMutation(DELETE_ARTIST, {
    refetchQueries: [{ query: GET_ARTISTS }],
    onCompleted: ({ deleteArtist }) => {
      setOpenConfirmDialog(false);
      setSnackbarMessage("Artist deleted successfully");
      setOpenSnack(true);
    },
  });

  const handleConfirmDelete = () => {
    deleteArtist({
      variables: {
        artistId: deleteArtistId,
      },
    });
  };

  const handleRefresh = () => {
    refreshArtists();
  };

  return (
    <>
      <FeedBackSnackbar
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={snackbarMessage}
      ></FeedBackSnackbar>
      <Box>
        <ConfirmDialog
          title="Confirm Delete"
          message="Are you sure you want to delete artist?"
          open={openConfirmDialog}
          onNo={(a) => setOpenConfirmDialog(false)}
          onYes={handleConfirmDelete}
        />
        <Grid container alignItems="baseline" spacing={2}>
          <Grid item md={6} xs={12} alignItems="center">
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                onChange={(e) => setSearchString(e.target.value)}
                autoFocus
                fullWidth
                value={searchString}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="large">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                size="small"
                variant="outlined"
                sx={{ minHeight: "40px" }}
                onClick={(a) => setSearchString("")}
              >
                Clear
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ minHeight: "40px" }}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rowHeight={42}
              headerHeight={42}
              dense={true}
              getRowId={(row) => row.id}
              rows={artists}
              columns={columns}
              columnVisibilityModel={{ id: false }}
              pagination
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
                sorting: {
                  sortModel: [{ field: "payoutAmount", sort: "desc" }],
                },
              }}
              pageSizeOptions={[10, 20, 50]}
              pageSize={10}
              loading={loading}
              disableSelectionOnClick={false}
              componentsProps={{
                row: {
                  style: { cursor: "pointer" },
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
