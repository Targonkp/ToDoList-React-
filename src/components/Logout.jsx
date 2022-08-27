import React, {useState} from 'react';

function Logout({logoutPage}){
    return(
        <a href="#" className="logout-button" onClick={logoutPage}>Выйти</a>
    )
}

export default Logout;