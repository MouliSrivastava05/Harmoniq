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
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Cover Image */}
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={song.coverImage} 
            alt={`Cover for ${song.title}`} 
            className="w-full h-full rounded-lg object-cover shadow-md" 
          />
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white bg-opacity-90 text-gray-800 hover:bg-opacity-100 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{song.title}</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-1">{song.artist}</p>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {song.genre && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {song.genre}
              </span>
            )}
            {song.year && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {song.year}
              </span>
            )}
          </div>
        </div>

        {/* Duration and Desktop Play Button */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-gray-500 text-sm sm:text-base font-medium">
            {song.duration}
          </div>
          {song.audioPreviewUrl && (
            <motion.button
              onClick={togglePlay}
              className="hidden sm:flex p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm3 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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