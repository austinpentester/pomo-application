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
import Quotes from "./Components/Quotes/Quotes";
import WallpaperComponent from "./Components/Wallpaper/Wallpaper";


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

          <div className="app">
               <div className="header">
                    <h1>Just Pomo</h1>
                    <div className="header-actions">
                         <button className="about-btn">Want to know about us?</button>
                         <div className="profile-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                   <circle cx="12" cy="7" r="4" />
                              </svg>
                         </div>
                    </div>
               </div>

               <div className="firstContainer">
                    <MusicPlayer/>
                    <WallpaperComponent/>
                    <Notes/>
               </div>

               <div className="secondContainer">
                    <Timer/>
                    <Quotes/>
               </div>

               <div className="thirdContainer">
                    <HeatMap/>
                    <TodoList/>
               </div>
          </div>
     );
}

export default App;
