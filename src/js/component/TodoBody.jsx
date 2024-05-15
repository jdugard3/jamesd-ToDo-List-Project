import React, { useEffect, useState } from "react";

// styles
import '../../styles/TodoBody.css'

// display the tasks 
// each task will need a delete button 
// the delete button will only appear on hover 

// be able to delete a task by clicking the trash icon
// we will be using arrays.filter() to help with removing the task object 
// creating a function to delete the task, it will require the id


const TodoBody = ({todos, setTodos}) => {

    // useEffect -> allows us to synchronize a component with an external system 
    // We can use useEffect to make a fetch call and retreive our todo list 
    // useEffect has 2 parameters (callback function, dependency array)
    // the callback function will be where we use our fetch call and process the response 
    // the dependency array is used to determine how the browers will rerender information 

	// const [todos, setTodos] = useState([]);



    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/JamesD')
        .then(response => response.json())
        .then(data => {
            setTodos(data.todos)
        })
        .catch(error => console.log("Error: ", error))

    }, [])

    // create a useEffect to delete a task 
    // useEffect(() => {
    //     .fetch('https://playground.4geeks.com/todo/todos/16')
    //     .then(response => response.json())
        
    // })

    const deleteTask = (selectedTodoId) => {
        fetch('https://playground.4geeks.com/todo/todos/' + selectedTodoId, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            // No need to send a body for a DELETE request
        })
            .then(resp => {
                if (resp.ok) {
                    console.log("Successfully deleted Todo!");
                    // Update the state locally
                    setTodos(todos.filter(todo => todo.id !== selectedTodoId));
                } else {
                    console.log("Failed to delete Todo:", resp.status);
                    // Handle error
                }
            })
            .catch(error => {
                console.log("There was an error deleting the Todo", error)
            })
    }




    let renderTasks = todos.map( todo => {
        return(
            <li key={todo.id} className="task-item">
                <span className="task">{todo.label}</span>  
                <span className="trash">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            fill="currentColor" 
                            className="bi bi-trash-fill" 
                            viewBox="0 0 16 16"
                            onClick={() => deleteTask(todo.id)}
                        >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>    
                </span>  
            </li>


        );
    })
    
    
    return (
		<>
            <section className="main">
                <ul className="task-list">
                    {todos.length !== 0 ? renderTasks : "No tasks. Add a task."}
                </ul>
            </section>
		</>
	);
};

export default TodoBody;