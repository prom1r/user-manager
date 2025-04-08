import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "../api/queries";
import { DEFAULT_SELECT_FIELDS, USER_LIMIT } from "../constants";
import { User } from "../types/User";

/**
 * Custom React Query hook for fetching users with infinite scrolling capability.
 */
export const useInfiniteUsers = () => {
  return useInfiniteQuery<
    { users: User[]; nextCursor?: number | null },
    Error,
    { pages: { users: User[]; nextCursor?: number | null }[] },
    ["infiniteUsers"],
    number | null | undefined
  >({
    queryKey: ["infiniteUsers"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam ?? 0;
      const response = await fetchUsers({
        limit: USER_LIMIT,
        skip: pageParam,
        select: DEFAULT_SELECT_FIELDS,
      });

      const { users, total } = response;
      const nextCursor =
        users.length === 0 || cursor + users.length >= total
          ? null
          : cursor + users.length;

      return { users, nextCursor };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.nextCursor === null) return undefined;
      return lastPage.nextCursor;
    },
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Custom React Query hook for fetching a single user by ID.
 * @param id - The ID of the user to fetch
 */
export const useUser = (id: number) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000,
  });
};
