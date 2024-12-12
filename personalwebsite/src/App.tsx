import React from 'react';
import './App.css';
import NavigationBar from './components/Navbar';
import ProfileAvatar from './components/Profilepic';
import ProfileSection from './components/Aboutme';
import AlternateTimeline from './components/Experiencetl';
import OutlinedCard from './components/Expcard';
import cardData from './components/assets/experience.json';
import { CardData } from './types'; // Import the interface
function App() {
  const timelineData = [
    { label: 'Started College in 2015' },
    { label: 'Internship at XYZ Corp in 2017' },
    { label: 'Graduated in 2019' },
    { label: 'Joined ABC Company in 2020' },
    { label: 'Promoted to Senior Developer in 2023' },
  ];

  const data: CardData = cardData as CardData;

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
    timelineItems={timelineData}
    />
    <OutlinedCard
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        buttonText={data.buttonText}
        onButtonClick={() => alert(`You clicked on ${data.title}`)}
      />
      
    </div>
      
  );
}

export default App;
