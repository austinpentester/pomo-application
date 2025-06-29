import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef(null);
  
  const tracks = [
    {
      name: "Rain Sounds",
      url: "/Music/cr.mp3",
      duration: 180
    },
    {
      name: "Ocean Waves",
      url: "https://www.soundjay.com/misc/sounds/ocean-waves.wav",
      duration: 240
    },
    {
      name: "Forest Meditation",
      url: "https://www.soundjay.com/misc/sounds/forest-birds.wav",
      duration: 300
    },
    {
      name: "White Noise",
      url: "https://www.soundjay.com/misc/sounds/white-noise.wav",
      duration: 200
    },
    {
      name: "Piano Ambient",
      url: "https://www.soundjay.com/misc/sounds/piano-ambient.wav",
      duration: 220
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const previousTrack = () => {
    const newTrack = currentTrack > 0 ? currentTrack - 1 : tracks.length - 1;
    setCurrentTrack(newTrack);
    setCurrentTime(0);
    setDuration(tracks[newTrack].duration);
  };

  const nextTrack = () => {
    const newTrack = currentTrack < tracks.length - 1 ? currentTrack + 1 : 0;
    setCurrentTrack(newTrack);
    setCurrentTime(0);
    setDuration(tracks[newTrack].duration);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="music-player-container">
      <div className="music-player-header">
        <h1 className="music-player-title">Study Music: <span className="music-player-track-name">{tracks[currentTrack].name}</span></h1>
        <h2 className="music-player-track-name"></h2>
      </div>

      <div className="music-player-progress">
        <div className="music-player-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercentage}
          onChange={handleProgressChange}
          className="music-player-progress-bar"
          style={{
            background: `linear-gradient(to right, #ffffff ${progressPercentage}%, #9ca3af ${progressPercentage}%)`
          }}
        />
      </div>

      <div className="music-player-controls">
        <button onClick={previousTrack} className="music-player-control-button">
          <SkipBack size={24} />
        </button>

        <button onClick={togglePlayPause} className="music-player-play-button">
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>

        <button onClick={nextTrack} className="music-player-control-button">
          <SkipForward size={24} />
        </button>
      </div>

      <div className="music-player-volume">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => {
            const newVolume = e.target.value / 100;
            setVolume(newVolume);
            if (audioRef.current) {
              audioRef.current.volume = newVolume;
            }
          }}
          className="music-player-volume-slider"
          style={{
            background: `linear-gradient(to right, #ffffff ${volume * 100}%, #9ca3af ${volume * 100}%)`
          }}
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>

      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        loop
      />
    </div>
  );
};

export default MusicPlayer;