import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl, 
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CreateRoomPage() {
  const defaultVotes = 2;
  const navigate = useNavigate();

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const handleVotesChange = (e) => {
    setVotesToSkip(Number(e.target.value));
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/core/create-room", requestOptions)
      .then((response) => response.json())
       .then((data) => navigate('/room/' + data.code));
  };

  return (
    <Grid
  container
  direction="column"
  spacing={3}
  style={{ minHeight: "100vh" }} // optional: full page height
  justifyContent="center" // vertical center
  alignItems="center"     // horizontal center
>
  <Grid item>
    <Typography component="h4" variant="h4" align="center">
      Create A Room
    </Typography>
  </Grid>

  <Grid item>
    <FormControl component="fieldset">
      <FormHelperText style={{ textAlign: "center" }}>
        Guest Control of Playback State
      </FormHelperText>
      <RadioGroup
        row
        value={guestCanPause.toString()}
        onChange={handleGuestCanPauseChange}
        style={{ justifyContent: "center" }} // center radio buttons horizontally
      >
        <FormControlLabel
          value="true"
          control={<Radio color="primary" />}
          label="Play/Pause"
        />
        <FormControlLabel
          value="false"
          control={<Radio color="secondary" />}
          label="No Control"
        />
      </RadioGroup>
    </FormControl>
  </Grid>

  <Grid item>
    <FormControl style={{ display: "flex", alignItems: "center" }}>
      <TextField
        required
        type="number"
        value={votesToSkip}
        onChange={handleVotesChange}
        inputProps={{ min: 1, style: { textAlign: "center" } }}
      />
      <FormHelperText style={{ textAlign: "center" }}>
        Votes Required To Skip Song
      </FormHelperText>
    </FormControl>
  </Grid>

  <Grid item>
    <Button
      color="primary"
      variant="contained"
      onClick={handleRoomButtonPressed}
    >
      Create A Room
    </Button>
  </Grid>

  <Grid item>
    <Button color="secondary" variant="contained" component={Link} to="/">
      Back
    </Button>
  </Grid>
</Grid>

  );
}
