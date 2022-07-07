import React, {useState, useRef} from 'react'
import AppToDo from '../AppToDo'

//создаю форму
function ToDoForm({addNewTask}) {
    //создаю состояние, куда первым значением помещаю первоначальное значение value в input
    const [inputValue, setInput] = useState('');

    //получаю ссылку на input
    const textInput = useRef()

    //создаю функцию, которая будет менять состояние и отражать последний ввод в input
    function handleChange(event) {
        setInput(event.target.value)
    }

    //функция, запускающая добавление задачи в массив ToDoList
    function handleSubmit(event) {
        event.preventDefault()
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        let currentDate = new Date().toLocaleString("ru", options)
        if (inputValue == ''){
            textInput.current.placeholder = 'Вы пытаетесь добавить пустую задачу'
        }
        else {
            //передаю полученное значение из value в функцию добавления новой задачи
            addNewTask(inputValue, currentDate)
            //очищаю поле ввода
            setInput('');
            textInput.current.placeholder = 'Введите задачу'
        }
    }

    return(
        <div>
            <form action="" className='form-add-task'>
                <input ref={textInput} type="text" value={inputValue} onChange={handleChange} className='form-add-task__input' placeholder='Введите задачу'/>
                <input type="submit" value='Добавить задачу' className='form-add-task__button' onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default ToDoForm;