import React from 'react';
import SongCard from './SongCard';

function Playlist({
  songs
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Songs</h2>
      {
        songs.length > 0 ? (
          <ul className="space-y-4">
            {songs.map(song => (
              <li key={song.id}>
                <SongCard song={song} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No songs available for this mood yet.</p>
        )
      }
    </div>
  );
}

export default Playlist; 