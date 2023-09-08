import React, { useState } from "react";
import { FaPenToSquare, FaFloppyDisk, FaTrashCan } from "react-icons/fa6";
import "./ToDoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { text: newTask, completed: false, showMenu: false, editText: newTask },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleMenu = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].showMenu = !updatedTasks[index].showMenu;
    setTasks(updatedTasks);
  };

  const saveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedTasks[index].editText;
    updatedTasks[index].showMenu = false;
    setTasks(updatedTasks);
  };

  const handleEditTextChange = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].editText = newText;
    setTasks(updatedTasks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  return (
    <div className="toDoListContainer">
      <h2>To-Do List</h2>
      <form className="addTaskContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button>Add</button>
      </form>
      <div className="listContainer">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="taskContainer">
                <div className="checkBoxCointainer">
                  <input
                    type="checkbox"
                    id={`cbx${index}`}
                    className="cbx"
                    onClick={() => toggleTask(index)}
                  />
                  <label htmlFor={`cbx${index}`} class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                  </label>
                </div>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.showMenu ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={task.editText}
                      onChange={(e) =>
                        handleEditTextChange(index, e.target.value)
                      }
                    />
                  ) : (
                    task.text
                  )}
                </span>
              </div>
              <div className="dropdownEditTask">
                <button onClick={() => toggleMenu(index)}>
                  <FaPenToSquare />
                </button>
                {task.showMenu && (
                  <div className="dropdown-content">
                    <button onClick={() => saveTask(index)}>
                      <FaFloppyDisk />
                    </button>
                    <button onClick={() => deleteTask(index)}>
                      <FaTrashCan />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
