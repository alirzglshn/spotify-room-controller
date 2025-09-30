import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room({ leaveRoomCallback }) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  const { roomCode } = useParams();
  const navigate = useNavigate();

  // function getRoomDetails() {
  //   return fetch("/core/get-room?code=" + roomCode)
  //     .then((response) => {
  //       if (!response.ok) {
  //         leaveRoomCallback();
  //         navigate("/");
  //         return;
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data) {
  //         setVotesToSkip(data.votes_to_skip);
  //         setGuestCanPause(data.guest_can_pause);
  //         setIsHost(data.is_host);

  //         if (data.is_host) {
  //           authenticateSpotify();
  //         }
  //       }
  //     });
  // }

  function getRoomDetails() {
    if (!roomCode) return; // skip if roomCode is empty

    return fetch("/core/get-room?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          // clear old roomCode from localStorage to stop infinite loop
          localStorage.removeItem("roomCode");
          leaveRoomCallback();
          navigate("/");
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);

          if (data.is_host) {
            authenticateSpotify();
          }
        }
      });
  }

  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data);
      });
  }

  function leaveButtonPressed() {
    fetch("/core/leave-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      localStorage.removeItem("roomCode");
      leaveRoomCallback();
      navigate("/");
    });
  }

  function renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, [roomCode]);

  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer {...song} />
      {isHost ? renderSettingsButton() : null}
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
