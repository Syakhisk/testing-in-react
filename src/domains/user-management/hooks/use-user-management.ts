import { useEffect, useState } from "react";
import { User } from "../models/user-management";
import axios, { AxiosResponse } from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

interface UserManagementHookProps {
  fetchOnInitialize?: boolean;
}

const defaultProps: UserManagementHookProps = {
  fetchOnInitialize: true,
};

export function UseUserManagement(props = defaultProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (props.fetchOnInitialize) fetchUsers();
  }, [props.fetchOnInitialize]);

  async function fetchUsers() {
    let res: AxiosResponse;
    try {
      res = await axios.get(`${API_URL}/users`);
    } catch (e) {
      return;
    }

    setUsers(res.data as User[]);
  }

  async function addUser(user: User) {
    // create user
  }

  async function removeUser(id: string) {
    if (id == "") return;

    let res: AxiosResponse;
    try {
      res = await axios.delete(`${API_URL}/users/${id}`);
    } catch (e) {
      return;
    }
  }

  async function handleClickDelete(id: string) {
    await removeUser(id);
    await fetchUsers();
  }

  return {
    users,
    fetchUsers,
    addUser,
    removeUser,
    handleClickDelete,
  };
}
