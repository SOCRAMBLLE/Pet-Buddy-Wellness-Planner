import React, { useEffect, useState } from "react";
import { FaPenToSquare, FaFloppyDisk, FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import "./ToDoList.css";

const TodoList = ({ petID }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pets/list?petID=${petID}`
        );
        const toDoListData = response.data.toDoList;

        if (Array.isArray(toDoListData)) {
          const formattedTasks = toDoListData.map((item) => {
            const taskDescription = item.M.Description.S;
            const taskStatus = item.M.Completed.BOOL;
            const taskID = item.M.TaskID.S;

            return {
              text: taskDescription,
              completed: taskStatus,
              showMenu: false,
              editText: taskDescription,
              taskID: taskID,
            };
          });

          setTasks(formattedTasks);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [petID]);

  // const addTask = () => {
  //   if (newTask.trim() !== "") {
  //     setTasks([
  //       ...tasks,
  //       { text: newTask, completed: false, showMenu: false, editText: newTask },
  //     ]);
  //     setNewTask("");
  //   }
  // };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // const deleteTask = (index) => {
  //   const updatedTasks = tasks.filter((_, i) => i !== index);
  //   setTasks(updatedTasks);
  // };

  const deleteTask = async (index, event) => {
    try {
      if (!tasks[index]) {
        console.error("Task not found in state.");
        return;
      } else {
        await axios.delete("http://localhost:5000/api/pets/deleteTask", {
          data: {
            petID: petID,
            taskID: tasks[index].taskID,
          },
        });
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      console.log("petID: " + petID + ", taskID: " + tasks[index].taskID);
    }
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   addTask();
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (newTask.trim() === "") {
      return;
    }
  
    try {
      // Try to make POST
      const response = await axios.post(
        "http://localhost:5000/api/pets/addTask",
        {
          petID: petID,
          newTask: newTask,
        }
      );
  
      // Verify if success
      if (response.status === 201) {
  
        // Clean field
        setNewTask("");
  
        // new fetch for updated tasks
        const updatedTasksResponse = await axios.get(
          `http://localhost:5000/api/pets/list?petID=${petID}`
        );
  
        // update the updated tasks state
        const toDoListData = updatedTasksResponse.data.toDoList;
        if (Array.isArray(toDoListData)) {
          const formattedTasks = toDoListData.map((item) => {
            const taskDescription = item.M.Description.S;
            const taskStatus = item.M.Completed.BOOL;
            const taskID = item.M.TaskID.S;
  
            return {
              text: taskDescription,
              completed: taskStatus,
              showMenu: false,
              editText: taskDescription,
              taskID: taskID,
            };
          });
  
          setTasks(formattedTasks);
        } else {
          setTasks([]);
        }
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
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
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index}>
                <div className="taskContainer">
                  <div className="checkBoxCointainer">
                    <input
                      type="checkbox"
                      id={`cbx${index}`}
                      className="cbx"
                      onClick={() => toggleTask(index)}
                    />
                    <label htmlFor={`cbx${index}`} className="check">
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
            ))
          ) : (
            <p>No tasks were found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
