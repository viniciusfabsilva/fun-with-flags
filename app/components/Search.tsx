const Search = () => {
  const search = "";
  return (
    <div className="w-1/2">
      <div className="relative">
        <input
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2
         focus:ring-blue-500 focus:outline-none border-gray-300"
          value={search}
          onChange={() => {}}
          placeholder="Search by country name..."
        />
        <span className="absolute">o</span>
      </div>
    </div>
  );
};

export default Search;
