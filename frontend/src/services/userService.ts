import { api } from "./api"
import { User } from "@/types/user"

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/getUsers")
  return response.data
}

export const createUser = async (user: { name: string; email: string }) => {
  const response = await api.post("/createUser", user)
  return response.data
}

export const updateUser = async (user: { id: string; name: string; email: string }) => {
  const response = await api.put("/updateUser", user)
  return response.data
}

export const deleteUser = async (id: string) => {
  const response = await api.delete("/deleteUser", { data:{id }})
  return response.data
}
