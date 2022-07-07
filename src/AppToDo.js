import React, {useState} from 'react'
import Header from "./components/Header"
import posts from "./dataBase"

function TodoList() {
    const [toDoList, setToDoList] = useState(posts);
    return(
        <div className="app">
            <Header/>
        </div>
    )
}

export default TodoList;