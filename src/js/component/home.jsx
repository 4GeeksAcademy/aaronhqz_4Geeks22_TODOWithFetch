import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  //Logic here
  //useState inicia y actualiza setTask
  //Study React Hooks
  //el api envia dos objetos que son label y done. Label es un string vacio.
  const [task, setTask] = useState({ label: "", done: false });

  // stados globales van dentro de un array
  // La lista es un array entonces el useState es un array
  const [taskList, setTaskList] = useState([]);

  //... are operators and are used to save
  //esto crear el evento que va a actualizar la lista
  const crearLista = (e) => {
    setTask({ ...task, label: e.target.value });
  };

  const getTask = async () => {
    try {
      let response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/aaronhqz1"
      );
      if (response.ok) {
        let data = await response.json();
        setTaskList(data);
      }
    } catch (error) {
      console.log("#Catch1: No funciono");
    }
  };

  const putTast = async (e) => {
    if (e.key === "Enter") {
      try {
        let response = await fetch(
          "https://playground.4geeks.com/apis/fake/todos/user/aaronhqz1",
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify([...taskList, task]),
          }
        );
        if (response.ok) {
          getTask();
          setTask({ label: "", done: false });
        }
      } catch (error) {
        console.log("#Catch2: Failed to put task");
      }
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container">
      {/* Here goes the things the user sees */}

      <input
        type="text"
        name="label"
        value={task.label}
        onChange={crearLista}
        onKeyDown={putTast}
      />

      <ul className="TODOList">
        {taskList.map((item, index) => {
          return <li key={index}>{item.label}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
