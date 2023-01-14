import './prompt-style.css'
import React, {useState, useRef} from 'react'

function Prompt() {
    const [visible, setVisible] = useState(true)
    //создаю массив для класса
   let promptClasses = ['prompt-wrap']
   if (visible){
       //добавляю в массив активный класс
       promptClasses.push('prompt-wrap_active')
   }

   const closePrompt = () => {
        let newVisible = !visible;
        setVisible(newVisible)
   }

   

    return(
        //объединяю все элементы массива в одну строку с пробелом
        <div className={promptClasses.join(' ')}>
            <p>ToDo List на React (функциональные компоненты)</p>
            <span className='prompt-close' onClick={closePrompt}>X</span>
        </div>
    )
}

export default Prompt;