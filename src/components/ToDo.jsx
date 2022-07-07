import React from 'react'

//создаю непосредство задачу (task) с проверкой, выполнена ли задача или нет, чтобы присвоить тот или иной класс
function ToDo({todo, taskRemove}) {


    return(
        <div className="task-element" tabIndex="0" id={todo.id}>
            <div className={todo.complete ? "task-content done":"task-content active"}>
                <p className="task-element__text">{todo.description}</p>
                <p className="task-element__time"><strong>Задача добавлена:</strong> {todo.date}</p>
            </div>
            <div className="task-icon-remove">
                <div className="task-remove" onClick={taskRemove}></div>
            </div>
        </div>
    )
}

export default ToDo;