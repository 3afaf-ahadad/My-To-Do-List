import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => {
        if (!res.ok) {
          throw Error("💀 Error Fetching Data!!");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        console.log("done👍🏽✅");
      })
      .catch((err) => console.error(err));
  }, ["http://localhost:3000/tasks"]);

  function handleAddTask() {
    const taskText = inputValue;

    if (taskText) {
      const customId = String(Number(tasks[tasks.length - 1].id) + 1);
      const newTask = {
        id: customId.toString(),
        task: taskText,
      };

      fetch("http://localhost:3000/tasks", {
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

        .then((data) => {
          console.log("Server response after adding:", data);
          console.log("Current tasks before update:", tasks);

          setTasks((prev) => [...prev, newTask]);

          console.log("Tasks should now be:", [...tasks, data]);
          setInputValue("");
        })
        .catch((err) => {
          console.log("Error Adding task: ", err);
        });
    }
  }

  function handleDeleteTask(id) {
    console.log("Trying to delete task id:", id);
    fetch(`http://localhost:3000/tasks/${id}`, {
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
            tasks
              .filter((task) => task && task.task)
              .map((task) => (
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
