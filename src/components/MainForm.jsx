import {useEffect, useRef, useState} from 'react'

function MainForm({submitValue}) {
    const loginEl = useRef('')
    //состояние для value логина
    const [login, setLogin] = useState(loginEl.current.value)

    //получаю значение по ключу
    useEffect(() => {
        setLogin(localStorage.getItem('login'))
    }, [])

    //устанавливаю значение и привязываю к ключу
    useEffect(() => {
        localStorage.setItem('login', login)
    }, [login])

    function getFormValues(event) {
        event.preventDefault()
        let password = event.target.previousElementSibling.value
        let login = event.target.previousElementSibling.previousElementSibling.value
        submitValue(login, password)
    }

    return (
        <div className='form-container'>
        <div className='form-wrap'>
            <h1>Вход в ToDo List</h1>
            <form action="" className='main-form'>
                <input type="text" className='main-form__input' id='login' placeholder='Введите логин...' ref={loginEl}/>
                <input type="password" className='main-form__input' id='password' placeholder='Введите пароль...'/>
                <input type="submit" value='Войти' className='main-form__submit' onClick={getFormValues}/>
            </form>
        </div>
        </div>
    )
}

export default MainForm;