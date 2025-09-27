// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   FormHelperText,
//   FormControl,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// export default function CreateRoomPage() {
//   const defaultVotes = 2;
//   const navigate = useNavigate();

//   const [guestCanPause, setGuestCanPause] = useState(true);
//   const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

//   const handleVotesChange = (e) => {
//     setVotesToSkip(Number(e.target.value));
//   };

//   const handleGuestCanPauseChange = (e) => {
//     setGuestCanPause(e.target.value === "true");
//   };

//   const handleRoomButtonPressed = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         votes_to_skip: votesToSkip,
//         guest_can_pause: guestCanPause,
//       }),
//     };
//     fetch("/core/create-room", requestOptions)
//       .then((response) => response.json())
//        .then((data) => navigate('/room/' + data.code));
//   };

//   return (
//     <Grid
//   container
//   direction="column"
//   spacing={3}
//   style={{ minHeight: "100vh" }} // optional: full page height
//   justifyContent="center" // vertical center
//   alignItems="center"     // horizontal center
// >
//   <Grid item>
//     <Typography component="h4" variant="h4" align="center">
//       Create A Room
//     </Typography>
//   </Grid>

//   <Grid item>
//     <FormControl component="fieldset">
//       <FormHelperText style={{ textAlign: "center" }}>
//         Guest Control of Playback State
//       </FormHelperText>
//       <RadioGroup
//         row
//         value={guestCanPause.toString()}
//         onChange={handleGuestCanPauseChange}
//         style={{ justifyContent: "center" }} // center radio buttons horizontally
//       >
//         <FormControlLabel
//           value="true"
//           control={<Radio color="primary" />}
//           label="Play/Pause"
//         />
//         <FormControlLabel
//           value="false"
//           control={<Radio color="secondary" />}
//           label="No Control"
//         />
//       </RadioGroup>
//     </FormControl>
//   </Grid>

//   <Grid item>
//     <FormControl style={{ display: "flex", alignItems: "center" }}>
//       <TextField
//         required
//         type="number"
//         value={votesToSkip}
//         onChange={handleVotesChange}
//         inputProps={{ min: 1, style: { textAlign: "center" } }}
//       />
//       <FormHelperText style={{ textAlign: "center" }}>
//         Votes Required To Skip Song
//       </FormHelperText>
//     </FormControl>
//   </Grid>

//   <Grid item>
//     <Button
//       color="primary"
//       variant="contained"
//       onClick={handleRoomButtonPressed}
//     >
//       Create A Room
//     </Button>
//   </Grid>

//   <Grid item>
//     <Button color="secondary" variant="contained" component={Link} to="/">
//       Back
//     </Button>
//   </Grid>
// </Grid>

//   );
// }

import React, { useState } from "react";
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
  Collapse,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRoomPage({
  votesToSkip = 2,
  guestCanPause = true,
  update = false,
  roomCode = null,
  updateCallback = () => {},
}) {
  const [votes, setVotes] = useState(votesToSkip);
  const [guestControl, setGuestControl] = useState(guestCanPause);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleVotesChange = (e) => setVotes(e.target.value);
  const handleGuestCanPauseChange = (e) =>
    setGuestControl(e.target.value === "true");


  
  const handleRoomButtonPressed = () => {
    fetch("/core/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votes,
        guest_can_pause: guestControl,
      }),
    })
      .then((res) => res.json())
      .then((data) => navigate("/room/" + data.code));
  };

  const handleUpdateButtonPressed = () => {
    fetch("/core/update-room", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votes,
        guest_can_pause: guestControl,
        code: roomCode,
      }),
    }).then((res) => {
      if (res.ok) setSuccessMsg("Room updated successfully!");
      else setErrorMsg("Error updating room...");
      updateCallback();
    });
  };

  const renderCreateButtons = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );

  const renderUpdateButtons = () => (
    <Grid item xs={12} align="center">
      <Button
        color="primary"
        variant="contained"
        onClick={handleUpdateButtonPressed}
      >
        Update Room
      </Button>
    </Grid>
  );

  const title = update ? "Update Room" : "Create a Room";

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      style={{ minHeight: "100vh" }} // optional: full page height
      justifyContent="center" // vertical center
      alignItems="center" // horizontal center
    >
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg ? (
            <Alert severity="success" onClose={() => setSuccessMsg("")}>
              {successMsg}
            </Alert>
          ) : (
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required
            type="number"
            onChange={handleVotesChange}
            defaultValue={votes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>

      {update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
}
