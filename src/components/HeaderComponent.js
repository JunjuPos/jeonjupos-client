import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import "../css/headerComponent.css";
import {useLocation} from "react-router";
import {MyContext} from "../contexts/MyContext";

const HeaderComponent = () => {

    const {state} = useLocation();  // 주문테이블 고유번호                 // 테이블 고유번호
    const navigate = useNavigate();

    const homeOnClick = () => {
        console.log(localStorage.getItem("openyn"));
        if (localStorage.getItem("openyn") === "true") {
            navigate("/tables");
        }
    }

    const [date, setDate] = useState("");
    const [time, setTime] = useState(0);

    const currentTimer = () => {
        const weekday = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date();
        const year = String(date.getFullYear()).padStart(4, "0");
        const month = String(date.getMonth()+1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        setDate(`${year}.${month}.${day} [${weekday[date.getDay()]}]`)
        setTime(`${hours}:${minutes}`)
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000);
    }

    startTimer();

    return (
        <div className={"header-container"} onClick={homeOnClick}>
            <div className={"company"}>
                JeonJu POS
            </div>
            <div className={"header-items"}>
                <div className={"header-title-container"}>
                    <p className={"header-title-item"}>매장명 :</p><p className={"store-name"}>{localStorage.getItem("storename")}</p>
                    <p className={"header-title-item"}>영업일자 :</p><p className={"opening-date"}>{date}</p>
                    <p className={"header-title-item"}>테이블 :</p><p className={"table-num"}>{state}</p>
                </div>
                <div className={"header-date"}>
                    <span className={"date"}>{date}</span>
                    <span className={"time"}>{time}</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent