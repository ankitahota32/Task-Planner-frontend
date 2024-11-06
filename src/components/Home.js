import React, { useEffect, useState } from "react"
import axios from "axios";


function Home() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    //const [editTask, setEditTask] = useState("");
   // const [updatedText, setUpdatedText] = useState("");

    
    useEffect(() => {
        axios.post("http://localhost:8000/home", { task })
            .then((response) => setTask(response.data))
            .catch(e => {
                console.log(e);
            },[]);
    });

    const add = () => {
        if (task.trim() !== "") {
            axios.post("http://localhost:8000/home", { task: "" })
                .then((response => {
                    setTasks([...tasks, response.data]);
                    setTask("");
                }))
                .catch((error) => {
                    console.error(error);
                })
        } else {
            alert("Please enter a task");
        }
    };
    

     
    return (
        <div className="homepage">
            <h1>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" />
                <button className="add-button" onClick={add}>Add Me</button>
            </h1>
        </div>
    )

}
   export default Home