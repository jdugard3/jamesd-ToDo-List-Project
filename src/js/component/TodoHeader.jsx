import React, { useState } from "react";
import '../../styles/TodoHeader.css';


const TodoHeader = ({todos, setTodos}) => {
    const [newTask, setNewTask] = useState("")
    const [idCounter, setIdCounter] = useState(0);

    //controlled input 
    const addTask = () => {
        // console.log("Creating new task: ", newTask);

        let newTodoObject = {
            id: idCounter,
            label: newTask,
        };
        // the ...todos, the dots are the spread opeator. 
        // The spread operator expands the array into its elements and then newTodoObject is added at the end of the array. 
        // It is a way to push into a array. 
        // setTodos([...todos, newTodoObject]);
        // setIdCounter(idCounter + 1);

      fetch('https://playground.4geeks.com/todo/todos/JamesD', {
        method: 'POST',
        body: JSON.stringify(newTodoObject),
        headers: {"Content-Type": 'application/json'}
      })
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
            return(response.json())
      }) 
      .then(data => {
        setTodos([...todos, data]);
        setIdCounter(idCounter + 1);
      })
      .catch(error => console.log(error))         
    }
    //text validation
    const checkTextBox = () => {  
        let textbox = document.querySelector(".task-input");
        if (textbox.value === "") {
            alert("Please add a task.")
        } else {
            addTask();
            setNewTask("");
        }
    }
	return (
		<>
           <header className="header">
                <h1>To-Do-s</h1>
                <input 
                    className="task-input"
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={event  => setNewTask(event.target.value)}
                />
                <button
                    onClick={checkTextBox}
                >
                    Add Task
                </button>
            </header> 
		</>
	);
};

export default TodoHeader;