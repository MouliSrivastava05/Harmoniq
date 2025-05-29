import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';

function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    // In the next step, we will fetch/filter songs based on this mood
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Mood Music Player</h1>
      <MoodSelector onSelectMood={handleSelectMood} />
      
      {selectedMood && (
        <p className="text-center mt-4">Selected Mood: {selectedMood}</p>
      )}

      {/* Playlist component will go here */}
    </div>
  );
}

export default App;
