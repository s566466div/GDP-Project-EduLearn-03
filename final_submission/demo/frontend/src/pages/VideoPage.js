// src/pages/VideoPage.js
import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import './VideoPage.css';

const VideoPage = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [inputSrc, setInputSrc] = useState('');

  const handleUrlChange = (e) => {
    setInputSrc(e.target.value);
  };

  const loadUrlVideo = () => {
    setVideoSrc(inputSrc);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoSrc(fileUrl);
    }
  };

  return (
    <div className="video-page-container">
      <h1>Video Player</h1>
      <div className="video-source-controls">
        <input
          type="text"
          placeholder="Enter video URL"
          value={inputSrc}
          onChange={handleUrlChange}
          className="url-input"
        />
        <button onClick={loadUrlVideo}>Load Video</button>

        <label className="file-upload">
          <input type="file" accept="video/*" onChange={handleFileChange} />
          Select Video from Device
        </label>
      </div>

      {videoSrc ? (
        <VideoPlayer src={videoSrc} />
      ) : (
        <p>Please enter a URL or select a local video file to play.</p>
      )}
    </div>
  );
};

export default VideoPage;
