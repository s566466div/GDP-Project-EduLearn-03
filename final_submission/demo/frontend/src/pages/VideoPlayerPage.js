import React from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayerPage.css';
import Layout from '../components/Layout';

const VideoPlayerPage = () => {
  const { videoId } = useParams();

  // Construct the file URL using the backend endpoint
  const videoUrl = `http://localhost:5050/videos/${videoId}`;

  return (
    <Layout>

    <div className="video-player-container">
      <div className="video-header">
        <h1>Video Player</h1>
        <p>Now playing: {videoId}</p>
      </div>
      <div className="video-player-wrapper">
        <video
          className="video-player"
          src={videoUrl}
          controls
          autoPlay
          />
      </div>
      <div className="video-footer">
        <p>
          Need help? <a href="/support">Contact Support</a>
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default VideoPlayerPage;
