import Loader from "../Loader";
import SearchResults from "./SearchResults";

interface SearchContainerProps {
  inputRef?: React.Ref<HTMLInputElement>;
  handleSearchSubmit: (param: string) => void;
  users: any;
  isLoading: boolean;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  inputRef,
  handleSearchSubmit,
  users,
  isLoading,
}) => {
  return (
    <div className={"search-container"}>
      <input
        type="text"
        placeholder="Search user by nickname"
        ref={inputRef}
        className={"search-input"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchSubmit("username");
          }
        }}
      />
      <button onClick={() => handleSearchSubmit("username")}>Search</button>
      {isLoading && <Loader />}
      {users && users.length > 0 && (
        <div className="results-wrapper">
          <SearchResults users={users} />
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
