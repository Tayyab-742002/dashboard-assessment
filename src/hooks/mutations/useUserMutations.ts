import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../api/services/user.service";
import { queryKeys } from "../queryKeys";
import type { User } from "../../types/user.types";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) => userService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: number | string; data: Partial<User> }) =>
      userService.updateUser(String(args.id), args.data as User),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(id) });
      const prevUser = queryClient.getQueryData<User>(
        queryKeys.users.detail(id)
      );
      if (prevUser) {
        queryClient.setQueryData<User>(queryKeys.users.detail(id), {
          ...prevUser,
          ...data,
        });
      }
      return { prevUser, id };
    },
    onError: (_err, _var, context) => {
      if (context?.prevUser) {
        queryClient.setQueryData<User>(queryKeys.users.all, context.prevUser);
      }
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => userService.deleteUser(String(id)),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.users.detail(String(id)),
      });
      const prevUser = queryClient.getQueryData<User>(
        queryKeys.users.detail(String(id))
      );
      if (prevUser) {
        queryClient.setQueryData<User>(
          queryKeys.users.detail(String(id)),
          undefined
        );
      }
      return { prevUser, id };
    },
    onError: (_err, _var, context) => {
      if (context?.prevUser) {
        queryClient.setQueryData<User>(queryKeys.users.all, context.prevUser);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
