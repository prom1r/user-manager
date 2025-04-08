import { useEffect, useRef, useState } from "react";

import SearchContainer from "./SearchContainer";
import { SearchQueryParams } from "../../types/User";
import { useSearchUser } from "../../hooks/useUsers";

import "./Navbar.scss";
import Modal from "../Modal";

const Navbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useState<SearchQueryParams>({
    key: "username",
    value: "",
  });
  const [showNoResultsPopup, setShowNoResultsPopup] = useState(false);

  const { data, isLoading } = useSearchUser(searchParams);

  useEffect(() => {
    if (data && data.users.length === 0) {
      setShowNoResultsPopup(true);
    }
  }, [data]);

  const handleSearchSubmit = (param: string) => {
    const value = inputRef.current?.value;
    if (value) {
      setSearchParams({ key: param, value });
      inputRef.current!.value = "";
    }
  };

  return (
    <div>
      <nav className="navbar">
        <SearchContainer
          handleSearchSubmit={handleSearchSubmit}
          inputRef={inputRef}
          users={data?.users}
          isLoading={isLoading}
        />
      </nav>

      <Modal
        isOpen={showNoResultsPopup}
        onClose={() => setShowNoResultsPopup(false)}
      >
        <h2>No Results Found</h2>
        <p>Sorry, we couldn't find any results for your search.</p>
      </Modal>
    </div>
  );
};

export default Navbar;
