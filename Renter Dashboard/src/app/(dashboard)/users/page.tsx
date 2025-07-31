import UserTable from "@/components/users/UserTable";

const UserData = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-600">Manage and view all registered users</p>
      </div>

      <UserTable />
    </div>
  );
};

export default UserData;
