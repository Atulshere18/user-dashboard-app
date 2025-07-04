"use client"
import { useState } from "react"
import { createUser } from "@/services/userService"

interface Props {
  onUserCreated: () => void
}

export default function CreateUserForm({ onUserCreated }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createUser({ name, email })
      setName("")
      setEmail("")
      onUserCreated()
    } catch (err) {
      alert("Error creating user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border border-gray-200 rounded-lg shadow bg-white max-w-md"
    >
      <h2 className="text-xl font-bold m-0">Add New User</h2>

      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-600"
      />

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-600"
      />

      <button
        type="submit"
        disabled={loading}
        className={`text-white px-5 py-2 rounded-md text-base transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  )
}
