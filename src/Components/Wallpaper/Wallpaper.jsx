import React, { useState, useRef } from 'react';
import './Wallpaper.css';

const WallpaperComponent = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setWallpaper(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveWallpaper = () => {
    setWallpaper(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="wallpaper-container">
      <div className="wallpaper-header">
        <h2 className="wallpaper-title">Wallpaper</h2>
        <button 
          className="plus-button" 
          onClick={handlePlusClick}
          aria-label="Add wallpaper"
        >
          +
        </button>
      </div>
      
      <div className="wallpaper-display">
        {wallpaper ? (
          <div className="wallpaper-image-container">
            <img 
              src={wallpaper} 
              alt="Selected wallpaper" 
              className="wallpaper-image"
            />
            <button 
              className="remove-button"
              onClick={handleRemoveWallpaper}
              aria-label="Remove wallpaper"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="default-wallpaper">
            <div className="placeholder-content">
              <span className="placeholder-text">Click + to add your motivational wallpaper</span>
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="file-input"
      />
    </div>
  );
};

export default WallpaperComponent;