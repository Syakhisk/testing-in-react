import { UseUserManagement } from "../hooks/use-user-management";

export function UserManagement() {
  const { users, handleClickDelete } = UseUserManagement();

  return (
    <div className="flex flex-col gap-6">
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <div className="text-gray-400">{user.email}</div>

          <button
            className="border bg-white text-gray-800 rounded px-2 mt-2"
            onClick={() => handleClickDelete(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
