import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import "../style.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://695847526c3282d9f1d4b6fb.mockapi.io/api/tasks")
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
        done: false,
      };

      fetch("https://695847526c3282d9f1d4b6fb.mockapi.io/api/tasks", {
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
    fetch(`https://695847526c3282d9f1d4b6fb.mockapi.io/api/tasks/${id}`, {
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

  const toggleDoneUndone = (id) => {
    const current = tasks.find((t) => t.id === id);
    if (!current) return;

    const updated = { ...current, done: !current.done };

    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

    fetch(`https://695847526c3282d9f1d4b6fb.mockapi.io/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: updated.done }),
    })
      .then((res) => {
        if (!res.ok) throw Error(`💀 HTTP Error! status: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.error("Error updating task done: ", err);
        setTasks((prev) => prev.map((t) => (t.id === id ? current : t)));
      });
  };

  return (
    <div>
      <div className="container tasks-box rounded-5 py-3 my-5 mx-auto">
        <div className="title p-4 rounded-top-5">
          {" "}
          <img width={70} src="/images/tlist.png" /> To Do List:{" "}
        </div>
        <div className="container task-add d-flex">
          <input
            className="form-control border-1 px-4 rounded-start-pill w-75"
            type="text"
            id="input"
            value={inputValue}
            placeholder="Enter your task... "
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="btn p-2 px-4 rounded-end-pill"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>

        <ul className="list-unstyled m-3 d-grid row-gap-3">
          {tasks &&
            tasks
              .filter((task) => task && task.task)
              .map((task) => (
                <li key={task.id} className="container d-flex justify-content-left align-items-center gap-2">
                  <span onClick={

                    
                    () => toggleDoneUndone(task.id)}>
                    {task.done ? (
                      <img width={45} src="/images/checked.png" />
                    ) : (
                      <img width={45} src="/images/unchecked.png" />
                    )}
                  </span>
                  <i
                    className=" rounded-pill bi bi-arrow-up-circle-fill"
                    onClick={() => handleMoveTaskUp(task.id)}
                  ></i>
                  <i
                    className=" rounded-pill bi bi-arrow-down-circle-fill"
                    onClick={() => handleMoveTaskDown(task.id)}
                  ></i>{" "}
                  <span className={`m-1 ${task.done ? "done" : ""}`}>
                    {task.task}{" "}
                  </span>
                  <i
                    className="trash bi bi-trash-fill text-danger"
                    onClick={() => handleDeleteTask(task.id)}
                  ></i>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
export default ToDoList;
