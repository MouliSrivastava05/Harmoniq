import React from 'react';

function SongCard({
  song
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      {/* Placeholder for cover image */}
      <div className="w-12 h-12 bg-gray-300 rounded-md flex-shrink-0">
        {/* Image will go here */}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{song.title}</h3>
        <p className="text-gray-600 text-sm">{song.artist}</p>
      </div>
      {/* Placeholder for duration/preview button */}
      <div className="flex-shrink-0 text-gray-500 text-sm">
        {/* Duration or button will go here */}
      </div>
    </div>
  );
}

export default SongCard; 