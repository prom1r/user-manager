import { api } from "./index";
import { FetchUsersParams, User } from "../types/User";

export const fetchUsers = async (
  params: FetchUsersParams
): Promise<{ users: User[] }> => {
  const response = await api.get("/users", { params });
  return response.data;
};
