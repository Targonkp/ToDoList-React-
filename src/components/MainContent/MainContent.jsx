import './main-content.css';
import React, {useState, useRef, useMemo, useEffect, useContext} from 'react'
import ProgressBar from "../ProgressBar/ProgressBar";
import Header from "../Header";
import ToDoForm from "../ToDoForm";
import SearchInput from "../SearchInput/SearchInput";
import tasks from "../../dataTasks";
import ToDoList from "../ToDoList";
import Time from "../Time";
import Logout from "../Logout";
import Prompt from "../Propmpt/Prompt";
import {Context} from "../Context";

function MainContent({logoutPage}){
    //состояние списка задач
    const [toDoList, setToDoList] = useState(tasks)
    //состояние поиска
    const [searchQuery, setSearchQuery] = useState('')
    //состояние флага у часов
    const [flag, setFlag] = useState(true)
    //создаю хук с объектом контекста
    const {authorization, setAuthorization} = useContext(Context)
    let newToDoList = toDoList


    //для поиска - передаю callback и массив зависимостей, полученный результат передаю в список постов
    const searchedPosts = useMemo(() => {
        return  newToDoList.filter(post => post.description.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, toDoList])

    //при извлечении декодирую обратно в объект
    useEffect(() => {
        setToDoList(JSON.parse(localStorage.getItem('toDoList')))
    }, [])

    //передаю объект в localStorage, предварительно закодировав его в строку JSON
    useEffect(() => {
        //localStorage хранит только строку, поэтому для логического типа использую JSON
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
    }, [toDoList])

    //получаю id последнего элемента в списке, чтобы избежать дублирования в дальнейшем
    let lastElement
    lastElement = toDoList.length-1

    //создаю функцию, которая будет добавлять новую задачу в list - для этого передаю ее в виде пропса в ToDoForm
    function addNewTask(inputValue, currentDate) {
        //здесь в id вложил условие, если длина массива окажется равной одному, то id при добавлении нового элемента будет равно 1
        let newList = [...toDoList, {id: toDoList.length === 0 ? 1 : toDoList[lastElement].id + 1, description: inputValue, complete: false, date: currentDate}]
        setToDoList(newList)
    }

    //создаю функцию, удаляющую элемент
    function taskRemove(event){
        //получаю id у ближайшего родителя
        let targetId = +event.target.closest('.task-element').id
        let newList = toDoList.filter(task => task.id !== targetId)
        setToDoList(newList)
    }

    //создаю функцию для переключения задачи в статус выполнено/не выполнено
    function clickedTask(event) {
        let parentId = +event.target.closest('.task-element').id
        if (!event.target.classList.contains('task-remove')) {
            let newList = toDoList.map(
                (task) => {
                    if (task.id === parentId) {
                        return {...task, complete: !task.complete}
                    }
                    else {
                        return task;
                    }
                }
            )
            setToDoList(newList)
        }
    }

    //получаю значение value из поиска и обновляю состояние setSearchQuery
    function searchInputValue(event) {
        setSearchQuery(event.target.value)
    }

    //Функция, которая закрывает таймер при клике на close
    function closeTimer() {
        let closeTimer = !flag
        setFlag(closeTimer)
    }


    return (
        <>
      <div className='app-container'>
        <div className="app">
            <Prompt/>
            <ProgressBar/>
            <Header/>
            <ToDoForm addNewTask={addNewTask}/>
            <SearchInput searchInputValue={searchInputValue}/>
            {
                toDoList.length !== 0
                    ?<ToDoList toDoList={searchedPosts} clickedTask={clickedTask} taskRemove={taskRemove}/>
                    : <div className='empty-todolist'>В списке задач пусто</div>
            }
        </div>
        <div className={flag === true ? "timer-container" : "timer-container timer-container_disabled"}>
            <Time closeTimer={closeTimer} />
        </div>
        <div className="logout-container">
            <Logout logoutPage={logoutPage}/>
        </div>
      </div>
        </>
    )
}


export default MainContent;