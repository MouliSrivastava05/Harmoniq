import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import Playlist from './components/Playlist';
import NowPlaying from './components/NowPlaying';

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [allSongs, setAllSongs] = useState({}); // Store all songs from the local JSON
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null); // New state for the current playing song

  // Fetch songs from local JSON on component mount
  useEffect(() => {
    const fetchLocalSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/local_songs.json');
        if (!response.ok) {
          throw new Error('Failed to fetch local songs data');
        }
        const songsData = await response.json();
        setAllSongs(songsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching local songs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocalSongs();
  }, []); // Empty dependency array means this runs once on mount

  // Filter songs when selectedMood or allSongs changes
  useEffect(() => {
    if (selectedMood && allSongs[selectedMood]) {
      setFilteredSongs(allSongs[selectedMood]);
    } else {
      setFilteredSongs([]);
    }
  }, [selectedMood, allSongs]);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  // Function to set the current playing song
  const handleSelectSong = (song) => {
    setCurrentSong(song);
    // Here you would also add logic to actually play the audio preview
    // For now, we are just setting the state.
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Mood Music Player</h1>
      <MoodSelector onSelectMood={handleSelectMood} />

      {isLoading && <p className="text-center mt-4">Loading songs...</p>}
      {error && <p className="text-center mt-4 text-red-500">Error: {error}</p>}
      {!isLoading && !error && <Playlist songs={filteredSongs} onSelectSong={handleSelectSong} />}

      {/* Render NowPlaying component if a song is selected */}
      <NowPlaying song={currentSong} />

    </div>
  );
}

export default App;
