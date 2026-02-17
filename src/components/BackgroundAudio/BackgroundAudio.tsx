import React, { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import backgroundaudio from "../../assets/audio/background-audio.mp3";
import "./BackgroundAudio.css";

const BackgroundAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Autoplay blocked or playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Cleanup to prevent memory leaks or audio playing after component dies
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`navbar-btn-group themed-text
         ${isPlaying ? "active" : ""}`}
      aria-label="Toggle Audio"
      title={isPlaying ? "Mute" : "Play Music"}
    >
      <audio ref={audioRef} src={backgroundaudio} loop preload="auto" />

      {isPlaying ? (
        <FaVolumeUp className="audio-icon" />
      ) : (
        <FaVolumeMute className="audio-icon" />
      )}
    </button>
  );
};

export default BackgroundAudio;
