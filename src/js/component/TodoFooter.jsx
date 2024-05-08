import React from "react";
import '../../styles/TodoFooter.css'

// display how many tasks are listed, from 0 to infinity

const TodoFooter = ({todos}) => {
	return (
		<>
            <footer className="footer">
                {todos.length !== 1 ? 
				`${todos.length} items left.`
				:
				`${todos.length} item left.`
				}		
            </footer>
		</>
	);
};

export default TodoFooter;