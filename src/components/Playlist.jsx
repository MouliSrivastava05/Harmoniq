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
        className="text-4xl sm:text-5xl font-bold mb-12 text-center sm:text-left bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {songs.length > 0 ? `${songs.length} Song${songs.length !== 1 ? 's' : ''} Found` : 'No Songs Available'}
      </motion.h2>
      
      <AnimatePresence mode="wait">
        {songs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 sm:space-y-10"
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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center py-24"
          >
            <div className="w-36 h-36 mx-auto mb-10 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/10">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <p className="text-slate-300 text-2xl font-semibold mb-4">No songs available for this mood yet.</p>
            <p className="text-slate-400 text-lg">Try selecting a different mood to discover more music!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Playlist; 