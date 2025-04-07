import "./App.css";
import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

export const Todo = () => {
  
const [inputValue, setInputValue] = useState("");
const [task,setTask] = useState([]);
const [dateTime,setDateTime] = useState("");

const handleInputChanges = (value) => {
  setInputValue(value);
};

const handleFromSubmit =(event) => {
  event.preventDefault();

  if(!inputValue)return;

  if(task.includes(inputValue)){
    setInputValue("");
    return;
  }

  setTask((prevTask) => [...prevTask,inputValue]);

  setInputValue("");
};

//todo  date And time
useEffect(() => {
  const interval=setInterval(() => {
  const now = new Date();
  const fromattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  setDateTime(`${fromattedDate}-${formattedTime}`);
}
,1000);
return () => clearInterval(interval);
},[]);

//delete todo
const handelDeleteTodo = (value) => {
  console.log(task);
  console.log(value);
  const updateTask= task.filter((curTask )=> curTask !==value);
  setTask(updateTask);
};

//clear all
const handleClearTodoData = () => {
  setTask([]);

};

return (
    <section className="todo-container">
      <header>
        <h1>Todo list</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>
      <section className="todo-form">
        <form  onSubmit={handleFromSubmit}>
          <div>
            <input type="text" className="todo-input" autoComplete="off" value={inputValue}  onChange={(event)=>handleInputChanges(event.target.value)}/>
          </div>
          <div>
            <button type="submit" className="todo-btn">Add Task</button>
          </div>
        </form>
      </section>
      <section className="myUnOrderList">
        <ul>
          {task.map((curTask,index)=>{
            return(
              <li key={index} className="todo-item">
                <span>{curTask}</span>
                <button className="check-btn">
                  <MdCheck/>
                </button>
                <button className="delete-btn" 
                onClick={() => handelDeleteTodo(curTask)}>
                  <MdDeleteForever/>
                </button>
              </li>

            )
          })}
        </ul>
      </section>
      <section>
        <button className="clear-btn" onClick={handleClearTodoData}>Clear All</button>
      </section>
    </section>
  );
};