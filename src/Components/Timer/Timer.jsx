import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  // Timer states
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [totalPomodoros, setTotalPomodoros] = useState(0);
  
  // Refs
  const audioRef = useRef(null);
  
  // Timer settings
  const settings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Switch to next mode
  const switchMode = (nextMode) => {
    setMode(nextMode);
    setTimeLeft(settings[nextMode] * 60);
    setIsActive(false);
  };

  // Handle timer completion
  const handleComplete = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    if (mode === 'pomodoro') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      setTotalPomodoros(totalPomodoros + 1);
      
      // Every 4 pomodoros, take a long break
      if (newCycles % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('pomodoro');
    }
  };

  // Adjust time by +/- 1 minute
  const adjustTime = (amount) => {
    if (!isActive) {
      const newTime = Math.max(60, timeLeft + (amount * 60));
      setTimeLeft(newTime);
      
      // Update settings if we're adjusting the current mode
      if (Math.floor(newTime / 60) !== settings[mode]) {
        settings[mode] = Math.floor(newTime / 60);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, cycles, totalPomodoros]);

  const getNextMode = () => {
    if (mode === 'pomodoro') {
      return (cycles + 1) % 4 === 0 ? 'Long Break' : 'Short Break';
    }
    return 'Pomodoro';
  };

  return (
    <div className="timer-container">
      {/* Audio element for notifications */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="timer-card">
        {/* Mode selector */}
        <div className="mode-selector">
          <button 
            className={`mode-button ${mode === 'pomodoro' ? 'pomodoro-active' : ''}`}
            onClick={() => switchMode('pomodoro')}
          >
            Pomodoro
          </button>
          <button 
            className={`mode-button ${mode === 'shortBreak' ? 'short-break-active' : ''}`}
            onClick={() => switchMode('shortBreak')}
          >
            Short Break
          </button>
          <button 
            className={`mode-button ${mode === 'longBreak' ? 'long-break-active' : ''}`}
            onClick={() => switchMode('longBreak')}
          >
            Long Break
          </button>
        </div>
        
        {/* Timer display */}
        <div className="timer-display">
          <div className="time">
            {formatTime(timeLeft)}
          </div>
          <div className={`timer-label ${mode}-label`}>
            {mode === 'pomodoro' ? 'FOCUS TIME' : 'BREAK TIME'}
          </div>
        </div>
        
        {/* Timer controls */}
        <div className="timer-controls">
          <button 
            className={`start-button ${mode}-button`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button 
            className="reset-button"
            onClick={() => {
              setIsActive(false);
              setTimeLeft(settings[mode] * 60);
            }}
          >
            Reset
          </button>
        </div>
        
        {/* Time adjustment */}
        <div className="time-adjustment">
          <button 
            onClick={() => adjustTime(-1)} 
            disabled={isActive}
            className={`adjust-button ${isActive ? 'disabled' : ''}`}
          >
            -1 min
          </button>
          <button 
            onClick={() => adjustTime(1)} 
            disabled={isActive}
            className={`adjust-button ${isActive ? 'disabled' : ''}`}
          >
            +1 min
          </button>
        </div>
        
        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-item">
            <div className={`stat-value ${mode}-stat`}>
              {totalPomodoros}
            </div>
            <div className="stat-label">
              POMODOROS
            </div>
          </div>
          <div className="stat-item">
            <div className={`stat-value ${mode}-stat`}>
              {cycles}
            </div>
            <div className="stat-label">
              CYCLES
            </div>
          </div>
          <div className="stat-item">
            <div className={`stat-value next-stat ${mode}-stat`}>
              {getNextMode()}
            </div>
            <div className="stat-label">
              NEXT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;