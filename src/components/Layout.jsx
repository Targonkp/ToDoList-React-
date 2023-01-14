import React, {useState, useRef, useMemo, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Link, NavLink, Navigate} from 'react-router-dom'
import AppToDo from "./AppToDo"
import {Context} from "./Context"

function Layout() {
    //состояние авторизации
    const [authorization, setAuthorization] = useState(false)

    useEffect(() => {
        setAuthorization(JSON.parse(localStorage.getItem('authorizationKey')))
    }, [])

    useEffect(() => {
        localStorage.setItem('authorizationKey', JSON.stringify(authorization))
    }, [authorization])

    //получаю доступ к элементу (обёртке)
    const appWrap = useRef()

    //добавляю анимацию загрузки при входе и выходе из ЛК
    useEffect(() => {
        appWrap.current.classList.add('_preloader')
        setTimeout(
            () => {
                appWrap.current.classList.remove('_preloader')
            }, 1200
        )
    }, [authorization])

    //функция, которая меняет значение авторизации на false
    function logoutPage() {
        setAuthorization(false)
    }


    return (
        <Context.Provider value = {{authorization, setAuthorization}}>
        <div className='app-wrap' ref={appWrap}>
            <BrowserRouter>
            <AppToDo
                logoutPage={logoutPage}/>
            </BrowserRouter>
        </div>
        </Context.Provider>
      )
}

export default Layout;