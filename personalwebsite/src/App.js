import React from "react";
import NavigationBar from "./components/Navbar.jsx";
import ProfileAvatar from "./components/Profilepic.jsx";
import AboutMe from "./components/MyInfo.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavigationBar />
      <ProfileAvatar />
      <AboutMe />
    </div>
  );
}

export default App;