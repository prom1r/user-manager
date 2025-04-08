import React, { useEffect, useState } from "react";
import { User } from "../../types/User";
import { Link } from "react-router-dom";

import "./Navbar.scss";

type Props = {
  users: User[];
};

const SearchResults = ({ users }: Props) => {
  return (
    <div className="search-results">
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <Link to={`/user/${user.id}`}>{user.username}</Link>
        </div>
      ))}
    </div>
  );
};

export default React.memo(SearchResults);
