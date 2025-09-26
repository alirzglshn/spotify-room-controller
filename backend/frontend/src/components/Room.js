import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material"; // React 19 style
import { useParams, useNavigate } from "react-router-dom";

export default function Room({ leaveRoomCallback }) {
  const { roomCode } = useParams(); // grab room code from URL
  const navigate = useNavigate();

  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    async function getRoomDetails() {
      try {
        const response = await fetch(`/core/get-room?code=${roomCode}`);
        if (!response.ok) {
          leaveRoomCallback();
          navigate("/");
          return;
        }
        const data = await response.json();
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      } catch (error) {
        console.error("Error fetching room details:", error);
        leaveRoomCallback();
        navigate("/");
      }
    }

    getRoomDetails();
  }, [roomCode, leaveRoomCallback, navigate]);

  const leaveButtonPressed = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      await fetch("/core/leave-room", requestOptions);
      leaveRoomCallback();
      console.log("Leaving room, navigating home...");
      navigate("/");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }} // optional, vertically center on page
    >
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
