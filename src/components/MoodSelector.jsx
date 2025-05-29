import React from 'react';

function MoodSelector({
  onSelectMood
}) {
  const moods = ['Chill', 'Happy', 'Sad', 'Energetic'];

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {moods.map(mood => (
        <button
          key={mood}
          className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          onClick={() => onSelectMood(mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector; 