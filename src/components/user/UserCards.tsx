import { Key, useRef } from "react";
import { Link } from "react-router-dom";
import { useInfiniteUsers } from "../../hooks/useUsers";
import useObserver from "../../hooks/useObserver";
import UserCard from "./UserCard";

import { User } from "../../types/User";

import "./UserCards.scss";

const UserCards = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers();

  const observerTarget = useRef<HTMLDivElement>(null);

  useObserver({
    targetRef: observerTarget as React.RefObject<HTMLElement>,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      {data.pages.map(
        (page: { users: User[] }, pageIndex: Key | null | undefined) => (
          <div key={pageIndex} className="user-cards">
            {page.users.map((user) => (
              <Link to={`/user/${user.id}`} key={user.id}>
                <UserCard user={user} />
              </Link>
            ))}
          </div>
        )
      )}

      <div
        ref={observerTarget}
        style={{ height: "1px", background: "transparent" }}
      ></div>

      {isFetchingNextPage && <p className="loading-more">Loading more...</p>}
    </div>
  );
};

export default UserCards;
