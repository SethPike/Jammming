import { useState, useEffect } from 'react';
import './App.css';
import SearchNavbar from './view/components/searchBar';
import RingText from './view/components/ringText';
import { loginWithSpotify, getAccessToken, handleCallback, searchTracks, savePlaylist } from './util/spotify.js';

// --- Track Component ---
function Track({ track, onAdd, onRemove, isRemoval }) {
  return (
    <div className="track-row">
      <div className="track-info">
        <p className="track-name">{track.name}</p>
        <p className="track-meta">{track.artist} · {track.album}</p>
      </div>
      <button
        className="track-btn"
        onClick={() => isRemoval ? onRemove(track) : onAdd(track)}
      >
        {isRemoval ? '−' : '+'}
      </button>
    </div>
  );
}

// --- TrackList Component ---
function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  if (tracks.length === 0) {
    return <p className="empty-msg">{isRemoval ? 'No tracks staged yet.' : 'Search for songs above.'}</p>;
  }
  return (
    <div className="track-list">
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

// --- Playlist Panel Component ---
function PlaylistPanel({ stagedTracks, onRemove, onSave }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleSave = () => {
    if (!playlistName.trim()) return;
    onSave(playlistName);
    setPlaylistName('');
  };

  return (
    <div className="panel">
      <h2 className="panel-title">My Playlist</h2>
      <TrackList
        tracks={stagedTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <div className="playlist-save">
        <input
          className="playlist-input"
          type="text"
          placeholder="Playlist name..."
          value={playlistName}
          onChange={e => setPlaylistName(e.target.value)}
        />
        <button className="save-btn" onClick={handleSave}>
          Save to Spotify
        </button>
      </div>
    </div>
  );
}

// --- App ---
function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [stagedTracks, setStagedTracks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [token, setToken] = useState(() => getAccessToken());

  useEffect(() => {
    if (window.location.search.includes('code=')) {
      const code = new URLSearchParams(window.location.search).get('code');
      window.history.replaceState({}, '', '/');
      handleCallback(code).then(t => {
        if (t) setToken(t);
      });
    }
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim() || !token) return;
    setIsSearching(true);
    try {
      const tracks = await searchTracks(query, token);
      setSearchResults(tracks);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const addTrack = (track) => {
    if (stagedTracks.find(t => t.id === track.id)) return;
    setStagedTracks([...stagedTracks, track]);
  };

  const removeTrack = (track) => {
    setStagedTracks(stagedTracks.filter(t => t.id !== track.id));
  };

  const handleSavePlaylist = async (name) => {
    if (!name.trim() || stagedTracks.length === 0 || !token) return;
    try {
      await savePlaylist(name, stagedTracks.map(t => t.uri), token);
      alert(`"${name}" saved to Spotify!`);
      setStagedTracks([]);
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  if (!token) {
    return (
      <>
        <div className="header">
          <RingText>Jammming</RingText>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <button className="save-btn" style={{ width: 'auto', padding: '12px 32px' }}
            onClick={loginWithSpotify}>
            Connect Spotify
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="header">
        <RingText>Jammming</RingText>
      </div>
      <div className="search-bar"
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <SearchNavbar onSearch={handleSearch} />
      </div>
      <div className="panels">
        <div className="panel">
          <h2 className="panel-title">
            Search Results
            {isSearching && <span className="searching-indicator"> ···</span>}
          </h2>
          <TrackList
            tracks={searchResults}
            onAdd={addTrack}
            isRemoval={false}
          />
        </div>
        <PlaylistPanel
          stagedTracks={stagedTracks}
          onRemove={removeTrack}
          onSave={handleSavePlaylist}
        />
      </div>
    </>
  );
}

export default App;