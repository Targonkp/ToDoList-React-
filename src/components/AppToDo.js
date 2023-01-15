import React, {useState, useRef, useMemo, useEffect, useContext} from 'react'
import {Routes, Route, Link, NavLink, Navigate, useNavigate} from 'react-router-dom'
import Header from "./Header"
import tasks from "../dataTasks"
import ToDoList from "./ToDoList"
import ToDo from "./ToDo"
import ToDoForm from "./ToDoForm";
import Time from "./Time";
import MainForm from "./MainForm";
import SearchInput from "./SearchInput/SearchInput";
import Logout from "./Logout";
import MainContent from "./MainContent/MainContent";
import {Context} from "./Context"


function AppToDo({submitValue, logoutPage}) {
    //создаю хук с объектом контекста
    const {authorization, setAuthorization} = useContext(Context)
    //хук для редиректа
    const navigate = useNavigate()

    useEffect(
        () => {
            authorization ? navigate('/ToDoList-React-/build/main') : navigate('/ToDoList-React-/build/auth')
        }, [authorization]
    )

    return(

       <>
                <Routes>
                    <Route path='/ToDoList-React-/build/auth' element={<MainForm/>}/>
                    <Route path='/ToDoList-React-/build/main' element={<MainContent logoutPage={logoutPage}/>} />
                </Routes>
        </>
    )
}

export default AppToDo;