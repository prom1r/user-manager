import { api } from "./index";
import { FetchUsersParams, User, UsersResponse } from "../types/User";

/**
 * Asynchronous function `fetchUsers` performs an HTTP request to retrieve a list of users
 * with support for pagination and custom fields.
 *
 * @param limit - The number of users to retrieve (used to limit the output).
 * @param skip - The number of users to skip (used for pagination).
 * @param select - A comma-separated list of fields to include in the response (e.g., "id,name,email").
 *
 * @returns Promise<UsersResponse> - A promise that resolves to user data and metadata.
 */
export const fetchUsers = async ({
  limit,
  skip,
  select,
}: FetchUsersParams): Promise<UsersResponse> => {
  const response = await api.get("/users", {
    params: {
      limit,
      skip,
      select,
    },
  });

  return response.data;
};

/**
 * Asynchronous function `fetchUser` performs an HTTP request to retrieve detailed information
 * about a specific user by their unique identifier (`id`).
 *
 * @param id - The unique identifier of the user to fetch.
 *
 * @returns Promise<User> - A promise that resolves to the user's data.
 */
export const fetchUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
