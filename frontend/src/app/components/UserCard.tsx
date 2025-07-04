"use client"
import { User } from "@/types/user"
import { useState } from "react"

interface Props {
  user: User
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export default function UserCard({ user, onEdit, onDelete }: Props) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`p-6 border border-gray-200 rounded-lg bg-white transition-transform duration-200 flex justify-between items-center shadow ${
        showActions ? "scale-105 shadow-lg" : "scale-100 shadow-sm"
      }`}
    >
      <div>
        <p className="text-lg font-semibold text-gray-900 m-0">{user.name}</p>
        <p className="text-sm text-gray-500 m-0">{user.email}</p>
      </div>

      {showActions && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onEdit(user)}
            className="text-blue-600 border border-blue-500 bg-white text-sm px-3 py-1 rounded-md hover:bg-blue-50 hover:shadow"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-600 border border-red-500 bg-white text-sm px-3 py-1 rounded-md hover:bg-red-50 hover:shadow"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
