import { createContext, useEffect, useState } from "react";
import IndexedDb from "./utils/db";
import "./App.css";
import UserForm from "./component/user-form";

export const DBContext = createContext<{
  indexedDb: IndexedDb | null;
}>({
  indexedDb: null,
});

function App() {
  const [indexedDb, setIndexedDb] = useState<IndexedDb | null>(null);

  const initializeDB = async () => {
    let tempDb = new IndexedDb();
    await tempDb.createObjectStore();
    setIndexedDb(tempDb);
  };

  useEffect(() => {
    initializeDB();
  }, []);

  if (!indexedDb?.db) return <h1>Connecting Database... </h1>;

  return (
    <DBContext.Provider value={{ indexedDb: indexedDb }}>
      <div className="">
        <div className="row col-lg-10 p-2">
          <UserForm />
        </div>
      </div>
    </DBContext.Provider>
  );
}

export default App;
