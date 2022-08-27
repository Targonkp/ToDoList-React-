import React, {useState, useEffect} from 'react';


function Time ({closeTimer}){
    const [currentTime, time] = useState(new Date().toLocaleTimeString())

    //хук, отвечающий за отображение времени
    useEffect(() => {
        const intervalID = setInterval(() => {
            time(new Date().toLocaleTimeString())
        }, 1000)

        return() => clearInterval(intervalID)
    }, [])


    return(
        <div className='timer-wrap'>
            <span className='timer'>{currentTime}</span>
            <span className='timer-close' onClick={closeTimer}>X</span>
            <span className='timer-open' onClick={closeTimer}></span>
        </div>
    )
}

export default Time;