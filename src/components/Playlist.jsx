import React from 'react';
import SongCard from './SongCard';
import { motion } from 'framer-motion';

function Playlist({
  songs,
  onSelectSong
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Songs</h2>
      {
        songs.length > 0 ? (
          <ul className="space-y-4">
            {songs.map(song => (
              <motion.li
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => onSelectSong(song)}
                className="cursor-pointer"
              >
                <SongCard song={song} />
              </motion.li>
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