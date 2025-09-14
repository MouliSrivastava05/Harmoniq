import React from 'react';
import SongCard from './SongCard';
import { motion, AnimatePresence } from 'framer-motion';

function Playlist({
  songs,
  onSelectSong
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {songs.length > 0 ? `${songs.length} Song${songs.length !== 1 ? 's' : ''} Found` : 'No Songs Available'}
      </motion.h2>
      
      <AnimatePresence mode="wait">
        {songs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6"
          >
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                variants={itemVariants}
                onClick={() => onSelectSong(song)}
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <SongCard song={song} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-gray-600 text-lg">No songs available for this mood yet.</p>
            <p className="text-gray-500 text-sm mt-2">Try selecting a different mood to discover more music!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Playlist; 