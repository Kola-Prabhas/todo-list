import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'


export default function TaskManager() {
	const [tasksP, setTasksP] = useState([]);
	const [tasksC, setTasksC] = useState([]);
	const [completed, setCompleted] = useState(false);
	const inpRef = useRef(null);
	const completedButton = useRef(null);
	const pendingButton = useRef(null);



	function handleClick() {
		if (inpRef.current.value !== "") {
			let tasksCopy = tasksP.slice();
		    tasksCopy.push({
				title: inpRef.current.value,
				//completed: false,
		    });		
		
			inpRef.current.value = "";
			setTasksP(tasksCopy);
		}		
	}

	function handleTrashClick(index) {
		let tasksCopy;

		if (completed) {
			tasksCopy = tasksC.slice();
			tasksCopy.splice(index, 1);
			setTasksC(tasksCopy);
		} else {
			tasksCopy = tasksP.slice();
			tasksCopy.splice(index, 1);
			setTasksP(tasksCopy);
		}
		
	}


	function handleCircleClick(index) {
		if (!completed) {
			let tasksCopy = tasksC.slice();
			//tasksP[index].completed = true;
			tasksCopy.push(tasksP[index]);
			tasksP.splice(index, 1);
			setTasksP(tasksP.slice());
			setTasksC(tasksCopy);			
		}	
		
	}


	function handlePendingClick() {		
		pendingButton.current.style.backgroundColor = "red";
		completedButton.current.style.backgroundColor = "";
		setCompleted(false);
	}

	function handleCompletedClick() {
		completedButton.current.style.backgroundColor = "red";
		pendingButton.current.style.backgroundColor = "";
		setCompleted(true);
	}

	let rawTasks;

	if (completed) {
		rawTasks = tasksC.slice();
	} else {
		rawTasks = tasksP.slice();
	}


	let currentTasks = rawTasks.map((task, index) => {
		
		return (
			<li
				key={index}
				className = {'list-item' + (completed ? " text-style": "")}
			>
				<span className='title'>
					{task.title}
				</span>

				<span>
					<span className='icon trash' onClick={() => handleTrashClick(index)}>
						<FontAwesomeIcon icon={faTrash} />						
					</span>
					<span className='icon circle-check' onClick={() => handleCircleClick(index)}>
						<FontAwesomeIcon icon={faCircleCheck} />
					</span>
				</span>
			</li>
		);
	});



	return (
		<div className="task-manager">
			<Heading />
			<TaskAdder
				onButtonClick={handleClick}
				reference={inpRef}
			/>
			<TaskSort
				onPendingButtonClick={handlePendingClick}
				onCompletedButtonClick={handleCompletedClick}
				reference1={pendingButton}
				reference2={completedButton}
			/>
			<ul className='list'>{currentTasks}</ul>
		</div>
	);
}

function Heading() {
	return (
		<h1 className="heading">ToDo - List</h1>
	);
}



function TaskAdder({ onButtonClick, reference }) {

	return (
		<div className="task-adder" >
			<input type="text" placeholder="Enter the task name" ref={reference} />
			<CustomButton title="Add"  onClick={onButtonClick}/>
		</div>
	)
}


function TaskSort({onPendingButtonClick, onCompletedButtonClick, reference1, reference2}) {
	return (
		<div className="task-sort">
			<CustomButton title="Pending" onClick={onPendingButtonClick} ref1={reference1} />
			<CustomButton title="Completed" onClick={onCompletedButtonClick} ref1={reference2} />
		</div>
	);
}





function CustomButton({ title, onClick, ref1}) {
	return (
		<button
			className="custom-button"
			onClick={onClick}
			ref={ref1}
		>
			{title}
		</button>
	);
}


