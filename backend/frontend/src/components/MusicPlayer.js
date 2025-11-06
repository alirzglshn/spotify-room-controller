import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material"; // React 19 uses @mui/material now
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function MusicPlayer({
  title,
  artist,
  image_url,
  time,
  duration,
  is_playing,
}) {
  const pauseSong = () => {
    fetch("/spotify/pause", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  };

  const playSong = () => {
    fetch("/spotify/play", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  };

  const songProgress = (time / duration) * 100;

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={image_url} height="100%" width="100%" alt="song cover" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <div>
            <IconButton
              onClick={() => {
                is_playing ? pauseSong() : playSong();
              }}
            >
              {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
}
