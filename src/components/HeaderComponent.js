import React, {useState} from 'react';

const Header = () => {

    const [timer, setTimer] = useState(0);

    const currentTimer = () => {
        const date = new Date();
        const year = String(date.getFullYear()).padStart(4, "0");
        const month = String(date.getMonth()+1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const second = String(date.getSeconds()).padStart(2, "0");
        setTimer(`${year}-${month}-${day} ${hours}:${minutes}:${second}`)
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000);
    }

    startTimer();

    return (
        <div id={"header"} style={{
            backgroundColor: 'gray',
            height: '45px',
            textAlign: 'center'
        }}>
            <span
                id={"header-title"}
                style={{
                    fontSize: '40px',
                    marginRight: '10px'
                }}
            >전주손칼국수</span>
            <span
                id={"header-date"}
                style={{
                    fontSize: '20px'
                }}
            >{timer}</span>
        </div>
    )
}

export default Header