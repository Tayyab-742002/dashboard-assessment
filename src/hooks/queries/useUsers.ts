import { useQuery } from "@tanstack/react-query";
import { userService } from "../../api/services/user.service";
import { queryKeys } from "../queryKeys";
import type { User } from "../../types/user.types";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: queryKeys.users.all,
    queryFn: () => userService.getUsers(),
    staleTime: 2 * 60_000,
  });
}

export function useUser(id: number | string | undefined) {
  return useQuery<User>({
    queryKey: id ? queryKeys.users.detail(id) : ["users", "detail", "nil"],
    queryFn: () => userService.getUserById(String(id)),
    staleTime: 2 * 60_000,
  });
}
