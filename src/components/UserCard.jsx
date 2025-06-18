function UserCard({ user }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <img className="w-24 h-24 rounded-full mx-auto" src={user.avatar_url} alt="Avatar" />
      <h2 className="text-xl font-semibold mt-4">{user.name || user.login}</h2>
      <p className="text-gray-500">@{user.login}</p>
      <p className="mt-2">{user.bio}</p>
      <div className="mt-4 flex justify-around text-sm text-gray-600">
        <span>Repos: {user.public_repos}</span>
        <span>Followers: {user.followers}</span>
        <span>Following: {user.following}</span>
      </div>
      <a
        className="mt-4 inline-block text-blue-500 hover:underline"
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub
      </a>
    </div>
  );
}

export default UserCard;
