import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    "👩🏽‍💻Coding",
    "🎮 Playing games",
    " 🍜Eating",
  ]);

  function addTask(e) {}
  function deleteTask() {}
  function moveTaskUp() {}
  function moveTaskDown() {}

  return (
    <>
      <div className="todolist-container">
        <h1>To Do List: </h1>
        <div className="add-tasks">
          <input type="text" placeholder="Enter your task... " />
          <button>Add</button>
        </div>
        <div className="tasks-container">
          {tasks.map((t, index) => (
            <li key={index}>
              {" "}
              <button>Up</button> <button>Down</button> {t}{" "}
              <button>delete</button>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
export default ToDoList;
