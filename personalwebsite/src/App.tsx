import React from 'react';
import './App.css';
import NavigationBar from './components/Navbar';
import ProfileAvatar from './components/Profilepic';
import ProfileSection from './components/Aboutme';
import AlternateTimeline from './components/Experiencetl';
import Footer from './components/Footer';
import cardData from './components/assets/experience.json';
import { CardData } from './types'; 
function App() {

  const data: CardData[] = cardData as CardData[]; // // Cast the JSON data to the interface

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
    <AlternateTimeline 
    title="My Career Journey"
    timelineItems={data}
    />
    <Footer />
      
      
    </div>
      
  );
}

export default App;
