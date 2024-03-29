import {useEffect, useRef, useState, useContext} from 'react'
import {Context} from "./Context";
import {useNavigate} from "react-router-dom/index";

function MainForm() {
    //состояние для value логина
    const [login, setLogin] = useState('')
    //состояние для value пароля
    const [password, setPassword] = useState('')
    //создаю хук с объектом контекста
    const {authorization, setAuthorization} = useContext(Context)

    const reloadPage = () => {
        setTimeout(
            () => {
                window.location.reload()
            }, 500
        )
    }

    //получаю значение по ключу
    useEffect(() => {
        setLogin(localStorage.getItem('login'))
    }, [])

    //устанавливаю значение и привязываю к ключу
    useEffect(() => {
        localStorage.setItem('login', login)
    }, [login])


    //функция для проверки логина и пароля
    function getFormValues(event) {
        event.preventDefault()
        if (login === 'Admin' && password === '123') {
            setAuthorization(true)
            reloadPage()
        }
        else {
            alert('Вы ввели неправильный пароль, повторите снова!')
        }
    }

    return (
        <div className='form-container'>
        <div className='form-wrap'>
            <h1>Вход в ToDo List</h1>
            <form action="" className='main-form'>
                <input
                    type="text"
                    className='main-form__input'
                    id='login'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder='Введите логин...'
                />
                <input
                    type="password"
                    className='main-form__input'
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Введите пароль...'
                />
                <input type="submit" value='Войти' className='main-form__submit' onClick={getFormValues}/>
            </form>
        </div>
        </div>
    )
}

export default MainForm;