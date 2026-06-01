import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkipForward, Volume2, VolumeX } from 'lucide-react';

const IntroPage = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Auto-play video when component mounts and video is loaded
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play failed:', error);
      });
    }
  }, [videoLoaded]);

  const handleVideoLoaded = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log('Play error:', error));
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => {
      localStorage.setItem('introSeen', 'true');
      navigate('/language');
    }, 500);
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoError(true);
  };

  const handleSkip = () => {
    localStorage.setItem('introSeen', 'true');
    navigate('/language');
  };

  const handleContinue = () => {
    localStorage.setItem('introSeen', 'true');
    navigate('/language');
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // If video has error, show fallback
  if (videoError) {
    return (
      <div className="relative h-screen w-full bg-gradient-to-br from-emerald-800 to-green-700 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-5xl">🌾</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">KrishiSetu</h1>
          <p className="text-emerald-200 mb-8">Farmer's Digital Assistant</p>
          <button
            onClick={handleSkip}
            className="px-8 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-500 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-900 to-green-800">
      {/* Video Container */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          onLoadedData={handleVideoLoaded}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          className="h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src="/videos/krishisetu-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Skip Button - Top Right */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-5 z-30 px-5 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-black/70 transition flex items-center gap-2"
      >
        Skip <SkipForward size={14} />
      </button>

      {/* Mute Button - Bottom Right */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-5 z-30 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition"
      >
        {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
      </button>

      {/* Continue Button - After video ends */}
      {videoEnded && (
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 animate-fade-up">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3"
            >
              <span>Continue to KrishiSetu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Branding Watermark */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none opacity-50">
        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full mx-auto">
          <span className="text-sm">🌾</span>
          <span className="text-white text-xs tracking-wide">KrishiSetu</span>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;