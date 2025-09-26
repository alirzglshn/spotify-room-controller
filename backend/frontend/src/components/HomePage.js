// HomePage.js
import React, { useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/core/user-in-room")
      .then((response) => response.json())
      .then((data) => setRoomCode(data.code));
  }, []);

  const renderHomePage = () => (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h3" component="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item>
        <ButtonGroup disableElevation variant="contained">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  return roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage();
}
