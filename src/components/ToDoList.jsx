import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    "👩🏽‍💻Coding",
    "🎮 Playing games",
    " 🍜Eating",
  ]);

  function addTask() {
    const task = document.getElementById("input").value;
    if (task) {
      setTasks([...tasks, task]);
    }
    document.getElementById("input").value = "";
  }
  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }
  function moveTaskUp(index) {
    const movedTasks = [...tasks];
    if (index > 0) {
      const task = movedTasks[index];
      movedTasks[index] = movedTasks[index - 1];
      movedTasks[index - 1] = task;
    }
    setTasks(movedTasks);
  }
  function moveTaskDown(index) {
    const movedTasks = [...tasks];
    if (index < tasks.length - 1) {
      const task = movedTasks[index];
      movedTasks[index] = movedTasks[index + 1];
      movedTasks[index + 1] = task;
    }
    setTasks(movedTasks);
  }

  return (
    <>
      <div className="todolist-container container">
        <h1>To Do List: </h1>
        <div className="add-tasks">
          <input type="text" id="input" placeholder="Enter your task... " />
          <button onClick={addTask}>Add</button>
        </div>
        <div className="tasks-container container">
          {tasks.map((t, index) => (
            <li key={index}>
              {" "}
              <button onClick={() => moveTaskUp(index)}>Up</button>{" "}
              <button onClick={() => moveTaskDown(index)}>Down</button> {t}{" "}
              <button onClick={() => deleteTask(index)}>delete</button>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
export default ToDoList;
