import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import TopArtistBarChart from "../components/dashboard/TopArtistBarChart";
import { GET_TOP_ARTISTS } from "../graphql/Queries";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  const { error, loading, data } = useQuery(GET_TOP_ARTISTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setArtists(data.artists.items);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

  return (
    <>
      <Card variant="outlined" sx={{ backgroundColor: "#1E40AF" }}>
        <CardContent>
          <Typography
            variant="h4"
            color="white"
            sx={{ fontWeight: "600" }}
            gutterBottom
          >
            Hi, Vergel 👋🏻
          </Typography>
          <Typography variant="body" sx={{ color: "#e5e7eb99" }}>
            Quickly manage your artist's payouts with this tool.
          </Typography>
        </CardContent>
      </Card>
      <Paper sx={{ marginTop: 1, padding: 1 }}>
        <Typography variant="title" gutterBottom>
          Top 10 Artists by Average Payout Amount
        </Typography>
        {!loading && artists && <TopArtistBarChart data={artists}></TopArtistBarChart>}
      </Paper>
    </>
  );
}
