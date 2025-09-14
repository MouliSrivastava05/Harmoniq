import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      {/* Header */}
      <div className="relative backdrop-blur-2xl bg-white/5 border-b border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center">
            <motion.h1 
              className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Harmoniq
            </motion.h1>
            <motion.p 
              className="text-slate-300 text-xl sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover music that perfectly matches your mood with intelligent recommendations
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-8 py-16">
        <MoodSelector onSelectMood={handleSelectMood} selectedMood={selectedMood} />

        {isLoading && (
          <div className="flex flex-col justify-center items-center py-24">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-slate-600 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-blue-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="text-slate-400 mt-8 text-xl font-medium">Curating your perfect playlist...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-24">
            <div className="w-28 h-28 mx-auto mb-8 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
              <svg className="w-14 h-14 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-400 text-2xl font-semibold mb-3">Something went wrong</p>
            <p className="text-slate-400 text-lg mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              Try Again
            </button>
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
