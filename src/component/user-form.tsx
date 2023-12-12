import { ChangeEvent, useContext, useState } from "react";
import { DBContext } from "../App";
import UserList, { UserEntity } from "./user-list";

const initialUser = {
  id: 0,
  name: "",
  email: "",
  age: 18,
};

const UserForm = () => {
  const { indexedDb } = useContext(DBContext);

  const [reload, setReload] = useState<boolean>(false);

  const [user, setUser] = useState<UserEntity>(initialUser);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const saveUser = async () => {
    await indexedDb?.putValue("users", {
      ...user,
      id: user.id !== 0 ? user.id : new Date().getTime(),
    });
    setReload(true);
    setUser(initialUser);
  };

  return (
    <>
      <div className="form p-2">
        <h2>User Form</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={user.name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={user.email}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            className="form-control"
            name="age"
            type="number"
            min={18}
            value={user.age}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group mt-2">
          <button className="btn btn-success" onClick={saveUser}>
            Save
          </button>
        </div>
      </div>

      <div className="row">
        <UserList reload={reload} setReload={setReload} setUser={setUser} />
      </div>
    </>
  );
};

export default UserForm;
