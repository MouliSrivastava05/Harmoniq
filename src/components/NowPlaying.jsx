import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function NowPlaying({
  song
}) {
  return (
    <AnimatePresence>
      {song && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 p-8 bg-white/5 backdrop-blur-3xl border-t border-white/10 shadow-2xl z-50"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-6">
              {/* Cover Image with Animation */}
              <motion.div 
                className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-2xl blur-lg"></div>
                <img 
                  src={song.coverImage} 
                  alt={`Cover for ${song.title}`} 
                  className="relative w-full h-full rounded-2xl object-cover shadow-2xl border border-white/10" 
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-white/20"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(255, 255, 255, 0.3)",
                      "0 0 0 10px rgba(255, 255, 255, 0)",
                      "0 0 0 0 rgba(255, 255, 255, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Song Info */}
              <div className="flex-grow min-w-0">
                <motion.h3 
                  className="text-2xl sm:text-3xl font-bold text-white truncate mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  {song.title}
                </motion.h3>
                <motion.p 
                  className="text-slate-300 text-lg sm:text-xl font-medium mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {song.artist}
                </motion.p>
                <div className="flex items-center space-x-4">
                  {song.genre && (
                    <span className="px-4 py-2 bg-white/10 text-slate-200 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                      {song.genre}
                    </span>
                  )}
                  <span className="text-slate-400 text-sm font-semibold">
                    {song.duration}
                  </span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center space-x-4">
                <motion.button
                  className="p-4 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 shadow-xl border border-white/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                
                <motion.button
                  className="p-4 rounded-2xl bg-white/5 text-slate-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-opacity-50 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </motion.button>

                <motion.button
                  className="p-4 rounded-2xl bg-white/5 text-slate-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-opacity-50 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NowPlaying; 