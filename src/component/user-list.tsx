import { useContext, useEffect, useState } from "react";
import { DBContext } from "../App";

export interface UserEntity {
  id: number;
  name: string;
  email: string;
  age: number;
}

const UserList = ({
  reload,
  setReload,
  setUser,
}: {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: (data: UserEntity) => void;
}) => {
  const { indexedDb } = useContext(DBContext);

  const [users, setUsers] = useState<UserEntity[]>([]);

  const loadUsers = async () => {
    const result = await indexedDb!.getAllValue("users");
    setUsers(result);
    setReload(false);
  };

  const removeUser = async (id: number) => {
    await indexedDb!.deleteValue("users", id);
    setReload(true);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (reload) {
      loadUsers();
    }
  }, [reload]);

  return (
    <>
      <h1 className="form-label">User List</h1>
      <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => setUser(user)}
                    >
                      Edit{" "}
                    </button>
                    <button
                      className="btn btn-danger ms-1"
                      onClick={() => removeUser(user.id)}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
