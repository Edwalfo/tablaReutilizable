import { useEffect, useState } from "react";
import TablaReutilizable from "./components/ReusableTable";

interface User {
  id: number;
  name: string;
  age: number;
}

function App() {
  const data = [
    {
      id: 1,
      name: "Juan",
      age: 25,
    },
    {
      id: 2,
      name: "Pedro",
      age: 25,
    },
    {
      id: 3,
      name: "Luis",
      age: 25,
    },

    {
      id: 4,
      name: "Carlos",
      age: 25,
    },

    {
      id: 5,
      name: "Jose",
      age: 25,
    },

    {
      id: 6,
      name: "Jorge",
      age: 25,
    },

    {
      id: 7,
      name: "Ricardo",
      age: 25,
    },

    {
      id: 8,
      name: "Miguel",
      age: 25,
    },

    {
      id: 9,
      name: "Javier",
      age: 25,
    },

    {
      id: 10,
      name: "Cristian",
      age: 25,
    },
  ];

  useEffect(() => {
    setUsers(data);
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const columns = [ "name", "age"];

  const handleEdit = (id: number) => {
    console.log("Edit", id);
  }

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  }

  return (
    <>
      <h1>Pruebas</h1>
      <TablaReutilizable
        data={users}
        columns={columns}
        title="usuarios"
        pagination={true}
        rowsPerPage={7}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
