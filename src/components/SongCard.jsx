import React, { useState } from 'react';
import { motion } from 'framer-motion';

function SongCard({
  song
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (song.audioPreviewUrl) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (audio) {
          audio.play();
        } else {
          const newAudio = new Audio(song.audioPreviewUrl);
          newAudio.play();
          setAudio(newAudio);
          newAudio.onended = () => setIsPlaying(false);
        }
        setIsPlaying(true);
      }
    }
  };

  // Pause audio if component unmounts or a new song is selected
  React.useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [audio]); // Re-run effect if audio instance changes

  return (
    <motion.div 
      className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl rounded-2xl p-8 hover:bg-white/8 transition-all duration-700 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.01 }}
      layout
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
        {/* Cover Image */}
        <motion.div 
          className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <img 
            src={song.coverImage} 
            alt={`Cover for ${song.title}`} 
            className="relative w-full h-full rounded-2xl object-cover shadow-2xl border border-white/10" 
          />
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={togglePlay}
                className="p-4 rounded-full bg-white/95 text-slate-800 hover:bg-white transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm3 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Song Info */}
        <div className="flex-grow min-w-0">
          <h3 className="text-2xl sm:text-3xl font-bold text-white truncate mb-2 group-hover:text-slate-100 transition-colors">
            {song.title}
          </h3>
          <p className="text-slate-300 text-lg sm:text-xl mb-4 font-medium">{song.artist}</p>
          <div className="flex flex-wrap gap-3">
            {song.genre && (
              <span className="px-4 py-2 bg-white/10 text-slate-200 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                {song.genre}
              </span>
            )}
            {song.year && (
              <span className="px-4 py-2 bg-white/5 text-slate-400 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
                {song.year}
              </span>
            )}
          </div>
        </div>

        {/* Duration and Desktop Play Button */}
        <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-slate-400 text-lg sm:text-xl font-semibold">
            {song.duration}
          </div>
          {song.audioPreviewUrl && (
            <motion.button
              onClick={togglePlay}
              className="hidden sm:flex p-4 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 shadow-xl border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm3 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default SongCard; 