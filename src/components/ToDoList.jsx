import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        if (!res.ok) {
          throw Error("💀 Error Fetching Data!!");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.error("fetch error: ", err));
  }, []);

  function handleAddTask() {
    const taskText = inputValue;
    if (taskText) {
      let customId;
      if (tasks.length > 0) {
        customId = String(Number(tasks[tasks.length - 1].id) + 1);
      } else {
        customId = "1";
      }
      const newTask = {
        id: customId,
        task: taskText,
      };

      fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("💀Error adding Task!! ");
          }
          return res.json();
        })

        .then(() => {
          setTasks((prev) => [...prev, newTask]);

          setInputValue("");
        })
        .catch((err) => {
          console.log("Error Adding task: ", err);
        });
    }
  }

  function handleDeleteTask(id) {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(`💀 HTTP Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.log(err));
  }

  function handleMoveTaskUp(id) {
    const movedTasks = [...tasks];

    const currentIndex = tasks.findIndex((tasks) => tasks.id === id);
    if (currentIndex > 0) {
      [movedTasks[currentIndex], movedTasks[currentIndex - 1]] = [
        movedTasks[currentIndex - 1],
        movedTasks[currentIndex],
      ];

      setTasks(movedTasks);
    }
  }
  function handleMoveTaskDown(id) {
    const movedTasks = [...tasks];

    const currentIndex = tasks.findIndex((tasks) => tasks.id === id);
    if (currentIndex < tasks.length - 1) {
      [movedTasks[currentIndex], movedTasks[currentIndex + 1]] = [
        movedTasks[currentIndex + 1],
        movedTasks[currentIndex],
      ];

      setTasks(movedTasks);
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className="tasks-box container">
        <h1 className="p-3">To Do List: </h1>
        <div className="add-tasks container d-flex justify-content-center align-items-center w-75">
          <input
            className="form-control border-1 rounded-start-pill"
            type="text"
            id="input"
            value={inputValue}
            placeholder="Enter your task... "
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-outline-secondary rounded-end-pill" onClick={handleAddTask}>
            Add
          </button>
        </div>
        <ul className="tasks-container list-unstyled">
          {tasks &&
            tasks
              .filter((task) => task && task.task)
              .map((task) => (
                <li key={task.id} className="container m-3 col">
                  {" "}
                  <button
                    className="btn btn-secondary rounded-pill"
                    onClick={() => handleMoveTaskUp(task.id)}
                  >
                    Up
                  </button>{" "}
                  <button
                    className="btn btn-secondary rounded-pill"
                    onClick={() => handleMoveTaskDown(task.id)}
                  >
                    Down
                  </button>{" "}
                  <span className="container">{task.task} </span>
                  <button
                    className="btn btn-danger rounded-pill"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    delete
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
export default ToDoList;
