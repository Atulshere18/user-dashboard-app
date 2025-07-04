"use client"

import { useEffect, useState } from "react"
import { getUsers, updateUser, deleteUser } from "@/services/userService"
import { User } from "@/types/user"
import UserCard from "@/app/components/UserCard"
import CreateUserForm from "@/app/components/CreateUserForm"

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    fetchUsers()
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    await updateUser(editingUser)
    setEditingUser(null)
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      <aside className="w-60 bg-white p-4 shadow-md">
        <h2 className="font-bold text-xl text-blue-600 mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="#" className="no-underline text-gray-700">User Management</a>
          <a href="#" className="no-underline text-gray-700">Settings</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/40" alt="profile" className="rounded-full w-10 h-10" />
            <span className="font-medium">Admin</span>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Last Updated</h3>
            <p className="text-base font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>


        <CreateUserForm onUserCreated={fetchUsers} />

        {editingUser && (
          <form onSubmit={handleUpdate} className="mt-8 bg-white p-4 rounded-lg shadow max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <input
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
              placeholder="Name"
              required
            />
            <input
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
            >
              Update
            </button>
          </form>
        )}


        <div className="mt-8 flex flex-col gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u) => setEditingUser(u)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
