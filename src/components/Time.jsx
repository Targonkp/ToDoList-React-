import React, {useState, useEffect} from 'react';


function Time (){
    const [currentTime, time] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const intervalID = setInterval(() => {
            time(new Date().toLocaleTimeString())
        }, 1000)

        return() => clearInterval(intervalID)
    }, [])

    return(
        <div className='timer-wrap'>
            <span className='timer'>{currentTime}</span>
        </div>
    )
}

export default Time;