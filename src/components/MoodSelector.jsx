import React from 'react';
import { motion } from 'framer-motion';

function MoodSelector({
  onSelectMood,
  selectedMood
}) {
  const moods = [
    { name: 'Chill', color: 'from-blue-500 to-cyan-500', hoverColor: 'from-blue-400 to-cyan-400' },
    { name: 'Happy', color: 'from-amber-500 to-orange-500', hoverColor: 'from-amber-400 to-orange-400' },
    { name: 'Melancholy', color: 'from-violet-500 to-purple-500', hoverColor: 'from-violet-400 to-purple-400' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-16 px-4">
      {moods.map((mood, index) => (
        <motion.button
          key={mood.name}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 120,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3, type: "spring" }
          }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative group px-12 py-8 rounded-2xl font-semibold text-white 
            bg-gradient-to-br ${mood.color} shadow-xl
            hover:bg-gradient-to-br hover:${mood.hoverColor}
            hover:shadow-2xl transition-all duration-500
            ${selectedMood === mood.name 
              ? 'ring-2 ring-white/40 scale-105 shadow-2xl' 
              : 'hover:shadow-white/20'
            }
            min-w-[200px] text-center overflow-hidden
            backdrop-blur-sm border border-white/10
          `}
          onClick={() => onSelectMood(mood.name)}
        >
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center">
            <span className="text-lg font-semibold tracking-wide">
              {mood.name}
            </span>
          </div>
          
          {/* Subtle glow for selected state */}
          {selectedMood === mood.name && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-white/10"
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default MoodSelector; 