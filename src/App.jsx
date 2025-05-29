import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import Playlist from './components/Playlist';

// Placeholder song data - replace with API call later
const allSongs = [
  {
    id: 1,
    title: 'Song 1 (Chill)',
    artist: 'Artist A',
    mood: 'Chill',
    // Add other properties like cover image, duration, audio preview URL
  },
  {
    id: 2,
    title: 'Song 2 (Happy)',
    artist: 'Artist B',
    mood: 'Happy',
  },
  {
    id: 3,
    title: 'Song 3 (Chill)',
    artist: 'Artist C',
    mood: 'Chill',
  },
  {
    id: 4,
    title: 'Song 4 (Sad)',
    artist: 'Artist D',
    mood: 'Sad',
  },
  {
    id: 5,
    title: 'Song 5 (Energetic)',
    artist: 'Artist E',
    mood: 'Energetic',
  },
];

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    if (selectedMood) {
      const songsForMood = allSongs.filter(song => song.mood === selectedMood);
      setFilteredSongs(songsForMood);
    } else {
      setFilteredSongs([]); // Clear songs if no mood is selected
    }
  }, [selectedMood]);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Mood Music Player</h1>
      <MoodSelector onSelectMood={handleSelectMood} />
      
      <Playlist songs={filteredSongs} />
    </div>
  );
}

export default App;
