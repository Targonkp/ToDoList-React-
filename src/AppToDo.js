import React, {useState} from 'react'
import Header from "./components/Header"
import tasks from "./dataTasks"
import ToDoList from "./components/ToDoList"
import ToDo from "./components/ToDo"
import ToDoForm from "./components/ToDoForm";
import Time from "./components/Time";


function AppToDo() {
    //состояние списка задач
    const [toDoList, setToDoList] = useState(tasks)
    //состояние флага у часов
    const [flag, setFlag] = useState(true)
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

    //Функция, которая закрывает таймер при клике на close
    function closeTimer() {
         let closeTimer = !flag
         setFlag(closeTimer)
    }

    return(
         <>
        <div className="app">
            <Header/>
            <ToDoForm addNewTask={addNewTask}/>
            {
                toDoList.length !== 0
                ?<ToDoList toDoList={toDoList} clickedTask={clickedTask} taskRemove={taskRemove}/>
                : <div className='empty-todolist'>В списке задач пусто</div>
            }
        </div>
        <div className={flag === true ? "timer-container" : "timer-container timer-container_disabled"}>
        <Time closeTimer={closeTimer} />
        </div>
        </>
    )
}

export default AppToDo;