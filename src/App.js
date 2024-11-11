import './App.css';
import AddTask from "./components/AddTask.js"
import Login from "./components/Auth/Login/Login.js"
import Signup from "./components/Auth/SignUP/Singup.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/AddTask" element={<AddTask />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
