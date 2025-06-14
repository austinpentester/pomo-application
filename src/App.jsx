import Button from "./Components/Button/Button";
import InputField from "./Components/InputField/InputField";
import SelectField from "./Components/SelectField/SelectField";
import Signup from "./Pages/Signup/Signup";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Timer from "./Components/Timer/Timer";
import MusicPlayer from "./Components/MusicPlayer/MusicPlayer";
import HeatMap from "./Components/HeatMap/HeatMap";
import TodoList from "./Components/TodoList/TodoList";
import Notes from "./Components/Notes/Notes";



function App() {
    return (
      // <Router>
      //   <div className="App">
      //     <Routes>
      //       <Route path="/signup" element={<Signup />} />
      //       <Route path="/login" element={<Login />} />
      //       <Route path="/" element={<Home />} />
      //     </Routes>
      //   </div>
      // </Router>
      <div className="app-container">
        <MusicPlayer/>
        <Timer/>
        <HeatMap/>
        <TodoList/>
        <Notes/>
      </div>
    ); 
  }

export default App;