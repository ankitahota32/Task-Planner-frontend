import React, { useEffect, useState } from "react"
import axios from "axios";
import './AddTask.css'
import { useNavigate } from "react-router-dom";


function AddTask() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [updatedText, setUpdatedText] = useState("");
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }
        console.log(userId);
        setTasks([]);

        axios.get(`${process.env.REACT_APP_API_URL}/AddTask/get-task`, {
            headers: { "user-id": userId }
        })
            .then((response) => setTasks(response.data))
            .catch(e => {
                console.log(e);
            });
    }, [userId]);

    const add = () => { // Add the task 
        if (task.trim() !== "") {
            axios.post(`${process.env.REACT_APP_API_URL}/AddTask/get-task`, { task, User_id: userId })


                .then((response) => {
                    setTasks((prevTasks) => [...prevTasks, response.data]);
                    setTask("");
                })
                .catch((error) => {
                    console.error(error);
                })
        } else {
            alert("Please enter a task");
        }
    };

    const deleteTask = (taskId) => { //Delete Task 
        axios.delete(`${process.env.REACT_APP_API_URL}/AddTask/${taskId}`)
            .then(() => {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            })
            .catch((error) => console.error("Error deleting the task", error));

    };

    const handleEditClick = (task) => {
        setEditTask(task);
        setUpdatedText(task.task);
    };

    const handleSave = async () => {
        if (!editTask || !editTask._id) {
            console.error("Edit task or task Id is undefined");
            return;
        }
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/AddTask/${editTask._id}`, { task: updatedText });
            const updatedTask = response.data;
            setTasks(tasks.map((task) => (task._id === editTask._id ? updatedTask : task)));
            setEditTask(null);
            setUpdatedText("");
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };
    //https://task-planner-backend-1.onrender.com/


    return (
        <div id="AddTask-page">
            <button id="logout-button" onClick={() => {
                localStorage.removeItem("userId");
                navigate("/");
            }}>Logout</button>
            <h1><b><i>Task Planner</i></b></h1>
            <input id="input" type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" />
            <button id="add-button" onClick={add}>Add Me</button>
            <ul>

                {tasks.map((task) =>
                    <li key={task._id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                        {task.task}
                        <button id="delete-button" onClick={() => deleteTask(task._id)}>Delete</button>

                        {editTask && editTask._id === task._id ? (
                            <>
                                <input id="input" type="text" value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
                                <button id="Save-button" onClick={handleSave}>Save</button>
                                <button id="Cancle-button" onClick={() => setEditTask(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button id="Edit-button" onClick={() => handleEditClick(task)}>Edit</button>
                            </>
                        )}


                    </li>
                )}
            </ul>
        </div>
    )

}

export default AddTask