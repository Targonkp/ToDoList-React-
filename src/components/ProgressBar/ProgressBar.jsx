import './progress-bar.css'
import React, {useState} from 'react';

function ProgressBar() {
    //объявляю state, куда будет записываться текущий процент прокрутки
    const [scrolled, setScrolled] = useState()
    //навешиваю функцию скролла на window
    window.onscroll = function scrollDocument() {
        //полный размер документа
        let documentHeight = document.documentElement.scrollHeight;
        //высота видимой части
        let clientHeight = document.documentElement.clientHeight;
        //текущая прокрутка
        let currentScroll = document.documentElement.scrollTop;
        let result = Math.ceil((currentScroll/(documentHeight - clientHeight))*100);
        setScrolled(result)
    }

    return(
        <div className='progress-bar-container'>
            <div className="progress-bar" style={{width: scrolled + "%"}}></div>
        </div>
    )
}

export default ProgressBar;