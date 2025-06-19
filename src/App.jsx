import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchGitHubUser = async () => {
    try {
      setError('');
      setUserData(null);
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>GitHub Profile Finder</h1>

      <div className="search-box">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={fetchGitHubUser}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="profile-card">
          <img src={userData.avatar_url} alt="Avatar" className="avatar" />
          <h2>{userData.name}</h2>
          <p className="username">@{userData.login}</p>
          <p className="bio">{userData.bio}</p>

          <div className="stats">
            <div>
              <strong>{userData.public_repos}</strong>
              <p>Repos</p>
            </div>
            <div>
              <strong>{userData.followers}</strong>
              <p>Followers</p>
            </div>
            <div>
              <strong>{userData.following}</strong>
              <p>Following</p>
            </div>
          </div>

          <a href={userData.html_url} target="_blank" rel="noreferrer" className="view-link">
            View Profile →
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
