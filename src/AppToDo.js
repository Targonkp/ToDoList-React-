import React, {useState, useRef, useMemo, useEffect} from 'react'
import Header from "./components/Header"
import tasks from "./dataTasks"
import ToDoList from "./components/ToDoList"
import ToDo from "./components/ToDo"
import ToDoForm from "./components/ToDoForm";
import Time from "./components/Time";
import MainForm from "./components/MainForm";
import SearchInput from "./components/SearchInput/SearchInput";
import Logout from "./components/Logout";


function AppToDo() {
    //состояние списка задач
    const [toDoList, setToDoList] = useState(tasks)
    //состояние флага у часов
    const [flag, setFlag] = useState(true)
    //состояние авторизации
    const [authorization, setAuthorization] = useState(false)
    //состояние поиска
    const [searchQuery, setSearchQuery] = useState('')

    //для поиска - передаю callback и массив зависимостей, полученный результат передаю в список постов
    const searchedPosts = useMemo(() => {
        let newToDoList = toDoList
        return newToDoList.filter(post => post.description.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, toDoList])


    //при извлечении декодирую обратно в объект
    useEffect(() => {
        setToDoList(JSON.parse(localStorage.getItem('toDoList')))
    }, [])

    //передаю объект в localStorage, предварительно закодировав его в строку JSON
    useEffect(() => {
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
    }, [toDoList])

    //получаю текущее значение авторизации
    useEffect(() => {
        setAuthorization(localStorage.getItem('authorizationKey'))
    }, [])

    //устанавливаю ключ для сохранения текущего значения авторизации
    useEffect(() => {
        localStorage.setItem('authorizationKey', authorization)
    }, [authorization])


    //получаю id последнего элемента в списке, чтобы избежать дублирования в дальнейшем
    let lastElement
    lastElement = toDoList.length-1
    const appWrap = useRef()

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

    //функция, которая меняет значение авторизации на false
    function logoutPage() {
        appWrap.current.classList.add('_preloader')
        setTimeout(
            () => {
                setAuthorization(false)
                appWrap.current.classList.remove('_preloader')
            }, 1400
        )
    }

    //функция, сравнивающая логин и пароль из формы с правильными значениями
    function submitValue(loginForm, passwordForm) {
        if (loginForm === 'Admin' && passwordForm === '123') {
            appWrap.current.classList.add('_preloader')
            setTimeout(() => {
                    setAuthorization(true)
                }, 1500
            )
            setTimeout(
                () => {
                    appWrap.current.classList.remove('_preloader')
                }, 1400
            )
        }
        else
        {
            alert('Вы ввели неправильный логин и (или) пароль')
        }

    }

    //получаю значение value из поиска и обновляю состояние setSearchQuery
    function searchInputValue(event) {
        setSearchQuery(event.target.value)
    }

    return(
        <div className='app-wrap' ref={appWrap}>{
            authorization === false
            ?  <MainForm submitValue={submitValue}/>
            :
                <>
                    <div className="app">
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
                    </>

          }
        </div>
    )
}

export default AppToDo;