import type { User } from "@/features/users/data/schema";
import type { DataTableQuery } from "@/hooks/use-data-table";
import { client } from "@/lib/http";
import type { Pagination } from "@/models/types";

const users = client("/users");

export const getUsers = async (): Promise<User[]> => {
  const { data } = await users.get<User[]>("");
  return data;
};

export const getUsersTableData = async (query: DataTableQuery<User>) => {
  const { data } = await users.post<Pagination<User>>('/table', query);
  return data;
}

export const searchUsers = async (search: string): Promise<User[]> => {
  const { data } = await users.get<User[]>('/search', { params: { q: search } });
  return data;
};

export const saveUser = async (user: Partial<User>) => {
  return await users.post('', user);
}

export const editUser = async (id: string, user: Partial<User>) => {
  return await users.patch(`/${id}`, user)
}

export const deleteUser = async (id: string) => await users.delete(`/${id}`);
