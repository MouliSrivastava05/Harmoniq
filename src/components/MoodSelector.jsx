import React from 'react';
import { motion } from 'framer-motion';

function MoodSelector({
  onSelectMood,
  selectedMood
}) {
  const moods = [
    { name: 'Chill', emoji: '🌊', color: 'from-blue-400 to-cyan-400' },
    { name: 'Happy', emoji: '☀️', color: 'from-yellow-400 to-orange-400' },
    { name: 'Melancholy', emoji: '🌙', color: 'from-purple-400 to-indigo-400' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 px-4">
      {moods.map((mood, index) => (
        <motion.button
          key={mood.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative px-8 py-4 rounded-2xl font-semibold text-white 
            bg-gradient-to-r ${mood.color} shadow-lg
            hover:shadow-xl transition-all duration-300
            ${selectedMood === mood.name ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''}
            min-w-[140px] text-center
          `}
          onClick={() => onSelectMood(mood.name)}
        >
          <span className="text-2xl mr-2">{mood.emoji}</span>
          {mood.name}
        </motion.button>
      ))}
    </div>
  );
}

export default MoodSelector; 