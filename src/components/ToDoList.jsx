import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  function handleAddTask() {
    const taskText = inputValue;

    if (taskText) {
      const newTask = taskText;
      fetch("http://localhost:8000/tasks")({
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).then((res) => res.json());
    }
  }

  function handleDeleteTask(id) {}
  function handleMoveTaskUp(id) {}
  function handleMoveTaskDown(id) {}

  return (
    <>
      <div className="todolist-container container">
        <h1>To Do List: </h1>
        <div className="add-tasks">
          <input
            type="text"
            id="input"
            value={inputValue}
            placeholder="Enter your task... "
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <div className="tasks-container container">
          {tasks &&
            tasks.map((task) => (
              <li key={task.id}>
                {" "}
                <button onClick={() => handleMoveTaskUp(task.id)}>
                  Up
                </button>{" "}
                <button onClick={() => handleMoveTaskDown(task.id)}>
                  Down
                </button>{" "}
                {task.task}{" "}
                <button onClick={() => handleDeleteTask(task.id)}>
                  delete
                </button>
              </li>
            ))}
        </div>
      </div>
    </>
  );
}
export default ToDoList;
