import React, { useState } from 'react';

function SongCard({
  song
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const togglePlay = () => {
    if (song.audioPreviewUrl) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (audio) {
          audio.play();
        } else {
          const newAudio = new Audio(song.audioPreviewUrl);
          newAudio.play();
          setAudio(newAudio);
          newAudio.onended = () => setIsPlaying(false);
        }
        setIsPlaying(true);
      }
    }
  };

  // Pause audio if component unmounts or a new song is selected
  React.useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [audio]); // Re-run effect if audio instance changes

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      {/* Cover Image */}
      <div className="w-12 h-12 flex-shrink-0">
        <img src={song.coverImage} alt={`Cover for ${song.title}`} className="w-full h-full rounded-md object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{song.title}</h3>
        <p className="text-gray-600 text-sm">{song.artist}</p>
      </div>
      {/* Duration and Play Button */}
      <div className="flex-shrink-0 flex items-center space-x-2">
        <div className="text-gray-500 text-sm">
          {song.duration}
        </div>
        {song.audioPreviewUrl && (
          <button
            onClick={togglePlay}
            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm3 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default SongCard; 