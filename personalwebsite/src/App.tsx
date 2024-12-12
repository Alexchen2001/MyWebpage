import React from 'react';
import './App.css';
import NavigationBar from './components/Navbar';
import ProfileAvatar from './components/Profilepic';
import ProfileSection from './components/Aboutme';

function App() {
  return (
    <div>
      <NavigationBar 
      navBarColor="darkblue"
      />
      <ProfileAvatar />
      <ProfileSection
      primaryColor="darkblue" // Purple color for the cards
      buttonColor="darkblue" // Dark purple for the button
    />
      
    </div>
      
  );
}

export default App;
