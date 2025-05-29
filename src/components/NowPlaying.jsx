import React from 'react';

function NowPlaying({
  song
}) {
  if (!song) {
    return null; // Don't render if no song is playing
  }

  return (
    <div className="mt-8 p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4">
      {/* Cover Image */}
      <div className="w-16 h-16 flex-shrink-0">
        <img src={song.coverImage} alt={`Cover for ${song.title}`} className="w-full h-full rounded-md object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800">Now Playing: {song.title}</h3>
        <p className="text-gray-600 text-sm">{song.artist}</p>
      </div>
      {/* Playback controls could go here later */}
    </div>
  );
}

export default NowPlaying; 