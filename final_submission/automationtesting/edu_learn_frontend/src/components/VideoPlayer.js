// src/components/VideoPlayer.js
import React, { useRef, useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState('');

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleForward = () => {
    videoRef.current.currentTime += 10; // Forward by 10 seconds
  };

  const handleBackward = () => {
    videoRef.current.currentTime -= 10; // Backward by 10 seconds
  };

  const handleError = () => {
    setError('Unable to load video. Please check the video source or format.');
  };

  return (
    <div className="video-player-container">
      {error && <p className="error-message">{error}</p>}
      <video
        ref={videoRef}
        src={src}
        className="video-player"
        controls={false}
        onError={handleError}
      />
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleBackward}>⏪ 10s</button>
        <button onClick={handleForward}>10s ⏩</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <button onClick={toggleFullScreen}>Full Screen</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
