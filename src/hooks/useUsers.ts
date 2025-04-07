import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/queries";
import { SELECT_FIELDS, USER_LIMIT } from "../constants";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetchUsers({
        limit: USER_LIMIT,
        select: SELECT_FIELDS,
      }),
  });
};
