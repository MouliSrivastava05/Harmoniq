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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Harmoniq
          </h1>
          <p className="text-center text-gray-600 mt-2">Discover music that matches your mood</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <MoodSelector onSelectMood={handleSelectMood} selectedMood={selectedMood} />

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600">Loading songs...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😞</div>
            <p className="text-red-500 text-lg">Error: {error}</p>
            <p className="text-gray-500 text-sm mt-2">Please try refreshing the page</p>
          </div>
        )}
        
        {!isLoading && !error && (
          <Playlist songs={filteredSongs} onSelectSong={handleSelectSong} />
        )}
      </div>

      {/* NowPlaying component */}
      <NowPlaying song={currentSong} />
    </div>
  );
}

export default App;
