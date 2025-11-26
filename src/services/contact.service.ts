import type { Contact } from "@/features/contacts/data/schema";
import type { DataTableQuery } from "@/hooks/use-data-table";
import { client } from "@/lib/http";
import type { Pagination } from "@/models/types";

const contacts = client("/contacts");

export const importContacts = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return (await contacts.post<{ count: number }>('/import', formData)).data
}

export const saveContact = async (data: object) => {
  return await contacts.post("", data);
}

export const searchContacts = async (search: string) => {
  const { data } = await contacts.get<Contact[]>('/search', { params: { q: search } });
  return data ?? [];
}

export const editContact = async (id: string, data: object) => {
  return await contacts.patch(`/${id}`, data);
}

export const getContactsDataTable = async (query: DataTableQuery<Contact>): Promise<Pagination<Contact>> => {
  const { data } = await contacts.post<Pagination<Contact>>("/table", query);

  return data;
};

export const deleteContact = async (id: string) => await contacts.delete(`/${id}`);