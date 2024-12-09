import React from "react";
import NavigationBar from "./components/Navbar.jsx";
import ProfileAvatar from "./components/Profilepic.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavigationBar />
      <ProfileAvatar />
    </div>
  );
}

export default App;