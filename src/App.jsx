import { useState } from 'react';

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">GitHub Profile Finder</h1>

      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchGitHubUser}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
          <img
            src={userData.avatar_url}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-600">@{userData.login}</p>
          <p className="mt-2 text-sm text-gray-700">{userData.bio}</p>

          <div className="mt-4 flex justify-around text-sm text-gray-600">
            <div>
              <p className="font-bold">{userData.public_repos}</p>
              <p>Repos</p>
            </div>
            <div>
              <p className="font-bold">{userData.followers}</p>
              <p>Followers</p>
            </div>
            <div>
              <p className="font-bold">{userData.following}</p>
              <p>Following</p>
            </div>
          </div>

          {userData.html_url && (
            <a
              href={userData.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Profile →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
