import React from 'react';

interface IntroOverlayProps {
  visible: boolean;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ visible }) => {
  return (
    <div className={`intro-overlay ${visible ? 'intro-visible' : 'intro-hidden'}`}>
      <div className="intro-stars" />
      <div className="intro-ring" />
      <h1 className="intro-title">Welcome to Alexander Chen&apos;s Homepage</h1>
      <p className="intro-subtitle">You will be navigating his academic and engineering journey</p>
    </div>
  );
};

export default IntroOverlay;
