import React from 'react'
import ToDo from './ToDo'

//создаю список всех задач, которые есть в массиве
function ToDoList ({toDoList, clickedTask, taskRemove}) {
    //устанавливаю начальное значение для key, чтобы при удалении элементов из массива, каждый раз они присваивались с начала
    let keyId = 1
    return(
        //прохожусь по массиву объектов и в каждый передаю форму создания task и уникальный ключ
        <div className='tasks' onClick={clickedTask}>
            {
                toDoList.map(
                todo => {
                    return(
                        <ToDo todo={todo} taskRemove={taskRemove} key={todo.id}/>
                    )
                }
            )}
        </div>
    )
}

export default ToDoList;