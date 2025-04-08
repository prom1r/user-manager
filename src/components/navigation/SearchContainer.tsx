import SearchResults from "./SearchResults";

interface SearchContainerProps {
  inputRef?: React.Ref<HTMLInputElement>;
  handleSearchSubmit: () => void;
  users: any;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  inputRef,
  handleSearchSubmit,
  users,
}) => {
  return (
    <div className={"search-container"}>
      <input
        type="text"
        placeholder="Search user by nickname"
        ref={inputRef}
        className={"search-input"}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchSubmit();
        }}
      />
      <button onClick={handleSearchSubmit}>Search</button>
      {users && users.length > 0 && (
        <div className="results-wrapper">
          <SearchResults users={users} />
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
