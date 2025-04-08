import { Key, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteUsers } from "../../hooks/useUsers";
import useObserver from "../../hooks/useObserver";
import UserCard from "./UserCard";

import { SearchQueryParams, User } from "../../types/User";
import GenderFilter from "../filter/GenderFilter";

import "./UserCards.scss";
import Loader from "../Loader";

const UserCards = () => {
  const [searchParams, setSearchParams] = useState<SearchQueryParams>({
    key: "",
    value: "",
  });

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      key: "gender",
      value: event.target.value,
    });
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers(searchParams);

  const observerTarget = useRef<HTMLDivElement>(null);

  useObserver({
    targetRef: observerTarget as React.RefObject<HTMLElement>,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      <div>
        <GenderFilter
          onGenderChange={handleGenderChange}
          selectedGender={searchParams.value}
        />
      </div>
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
    </>
  );
};

export default UserCards;
