import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />}/>
        </Routes>
      </Router>
      // <p>fuck you !!!!</p>
    );
  }
}
