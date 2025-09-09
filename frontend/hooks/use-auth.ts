import api from "@/lib/axios";
import { endpoints } from "@/lib/api";
import type { User } from "@/types/auth";

export async function loginApi(username: string, password: string): Promise<User> {
  const res = await api.get(endpoints.admin.users.getAll);
  const users: User[] = res.data;

  const foundUser = users.find(
    (u) =>
      (u.username === username || u.studentCode === username) &&
      u.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid username or password");
  }

  const normalizedUser: User = {
    ...foundUser,
    role: foundUser.role.toLowerCase() as User["role"],
  };

  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  }

  return normalizedUser;
}

export async function getUsersApi(): Promise<User[]> {
  const res = await api.get(endpoints.admin.users.getAll);
  return res.data;
}
