import React, {useState, useEffect} from "react";
import CalendarComponent from "./CalendarComponent"
import "../css/saleManageComponent.css"
import '../css/calendarComponent.css'
import Calendar from "react-calendar";
import {
    getSaleList
} from "../api/axiosClient";


const SaleManageComponent = () => {

    const [calendarViewYn, setCalendarViewYn] = useState(false);
    const [startDate, setStartDate] = useState((new Date()).toISOString());
    const [endDate, setEndDate] = useState((new Date()).toISOString());
    const [saleList, setSaleList] = useState([]);

    const calendarViewHandler = () => {
        if (calendarViewYn === true) {
            setCalendarViewYn(false);
        } else {
            setCalendarViewYn(true);
        }
    }

    const [value, onChange] = useState([new Date(), new Date()]);

    const initSaleList = async () => {
        // setCalendarViewYn(false);
        // console.log(new Date(new Date().setDate(new Date().getFullYear() - 2)).toISOString());
        // const result = await getSaleList(new Date((new Date()).setDate(new Date().getFullYear() - 10)).toISOString(), endDate);
        // setSaleList(result.data.data.saleList);
    }

    useEffect(() => {
        initSaleList();
    }, [])

    useEffect(() => {
        //  날짜 기간 선택 시

        setStartDate(new Date(value[0].setDate(value[0].getDate()) + 1).toISOString());
        setEndDate(new Date(value[1].toISOString()).toISOString());
    }, [value])

    const dateOnClick = (e) => {
        const id = e.currentTarget.id;
        const today = new Date();
        if (id === "today") {
            setStartDate(new Date().toISOString());
        } else if (id === "yesterday") {
            setStartDate(new Date((new Date()).setDate(today.getDate() - 1)).toISOString());
        } else if (id === "week") {
            setStartDate(new Date((new Date()).setDate(today.getDate() - 7)).toISOString());
        } else if (id === "month") {
            setStartDate(new Date((new Date()).setMonth(today.getMonth() - 1)).toISOString());
        }

        setEndDate(today.toISOString());
    }

    const getSaleHandler = async () => {
        setCalendarViewYn(false);
        const result = await getSaleList(startDate, endDate);
        console.log(result.data.data);
        setSaleList(result.data.data.saleList);
    }

    const leftPad = (value) => {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    }

    const toStringByFormatting = (source, delimiter = '/') => {
        const year = new Date(source).getFullYear();
        const month = leftPad(new Date(source).getMonth() + 1);
        const day = leftPad(new Date(source).getDate());
        const time = leftPad(new Date(source).getHours())+":"+leftPad(new Date(source).getMinutes())+":"+leftPad(new Date(source).getSeconds())

        return [year, month, day].join(delimiter) + " " + time;
    }

    const toSelectStringByFormatting = (source, delimiter = '/') => {
        const year = new Date(source).getFullYear();
        const month = leftPad(new Date(source).getMonth() + 1);
        const day = leftPad(new Date(source).getDate());

        return [year, month, day].join(delimiter);
    }

    return (
        <div className={"sale-manage-container"}>
            <div className={"button-container"}>
                <button id={"today"} onClick={(e) => {dateOnClick(e)}}>오늘</button>
                <button id={"yesterday"} onClick={(e) => {dateOnClick(e)}}>어제</button>
                <button id={"week"} onClick={(e) => {dateOnClick(e)}}>일주일</button>
                <button id={"month"} onClick={(e) => {dateOnClick(e)}}>한달</button>
                <input className={"date-input"} value={toSelectStringByFormatting(startDate)} onClick={(e) => {calendarViewHandler()}}/>
                ~
                <input className={"date-input"} value={toSelectStringByFormatting(endDate)} onClick={(e) => {calendarViewHandler()}}/>
                <button onClick={getSaleHandler}>조회</button>

                {
                    calendarViewYn === true? <Calendar
                        onChange={onChange}
                        formatDay={(locale, date) =>
                            date.toLocaleString('en', { day: 'numeric' })
                        }
                        selectRange={true}
                        showNeighboringMonth={false}
                    >
                    </Calendar>: <></>
                }

            </div>
            <table className={"sale-list-container"}>
                <tr className={"sale-title"}>
                    <th className={"regdate"}>주문일자</th>
                    <th className={"paydate"}>결제일자</th>
                    <th className={"paycompleteyn"}>결제여부</th>
                    <th className={"totalsaleprice"}>주문금액</th>
                    <th className={"totalpayprice"}>결제금액</th>
                    <th className={"cardpayprice"}>카드결제금액</th>
                    <th className={"cashpayprice"}>현금결제금액</th>
                    <th className={"deferredpayprice"}>후불결제금액</th>
                    <th className={"expectedrestprice"}>남은금액</th>
                </tr>
                {
                    saleList.map((item) => {
                        return (
                            <tr className={"sale-card"}>
                                <td>{toStringByFormatting(item.regdate)}</td>
                                <td>{toStringByFormatting(item.paydate)}</td>
                                <td><input type={"checkbox"} id={item.paycompleteyn} name={""} disabled checked={item.paycompleteyn}/></td>
                                <td>{item.totalsaleprice.toLocaleString()}</td>
                                <td>{item.totalpayprice.toLocaleString()}</td>
                                <td>{item.cardpayprice.toLocaleString()}</td>
                                <td>{item.cashpayprice.toLocaleString()}</td>
                                <td>{item.deferredpayprice.toLocaleString()}</td>
                                <td>{item.expectedrestprice.toLocaleString()}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default SaleManageComponent;