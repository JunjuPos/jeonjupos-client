import React, {useState, useEffect} from "react";
import "../css/saleManageComponent.css"
import '../css/calendarComponent.css'
import Calendar from "react-calendar";
import {
    getSaleList
} from "../connection/index";
import {useNavigate} from "react-router-dom";


const SaleManage = () => {

    const navigate = useNavigate();

    const [calendarViewYn, setCalendarViewYn] = useState(false);
    const [startDate, setStartDate] = useState((new Date()).toISOString());
    const [endDate, setEndDate] = useState((new Date()).toISOString());
    const [saleList, setSaleList] = useState([]);
    const [searchPostPaidName, setSearchPostPaidName] = useState("");
    const [searchMenuName, setSearchMenuName] = useState("");
    const [totalPayPrice, setTotalPayPrice] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [totalCashPayPrice, setTotalCashPayPrice] = useState(0);
    const [totalCardPayPrice, setTotalCardPayPrice] = useState(0);
    const [totalDeferredPayPrice, setTotalDeferredPayPrice] = useState(0);
    const [totalExpectedRestPrice, setTotalExpectedRestPrice] = useState(0);

    const getSaleHandler = async () => {
        setCalendarViewYn(false);
        try{
            const result = await getSaleList(startDate, endDate, searchPostPaidName, searchMenuName);
            setSaleList(result.data.data.saleList);
            setTotalPayPrice(result.data.data.totalpayprice);
            setTotalSalePrice(result.data.data.totalsaleprice);
            setTotalCashPayPrice(result.data.data.totalcashpayprice);
            setTotalCardPayPrice(result.data.data.totalcardpayprice);
            setTotalDeferredPayPrice(result.data.data.totaldeferredpayprice);
            setTotalExpectedRestPrice(result.data.data.totalexpectedrestprice);
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    const calendarViewHandler = () => {
        if (calendarViewYn === true) {
            setCalendarViewYn(false);
        } else {
            setCalendarViewYn(true);
        }
    }

    const [value, onChange] = useState([new Date(), new Date()]);

    useEffect(() => {
        getSaleHandler();
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

    /**
     * 후불명부, 메뉴명 검색
     */
    const searchPostPaidOnChangeHandler = (e) => {
        setSearchPostPaidName(e.currentTarget.value);
    }

    const searchMenuNameOnchangeHandler = (e) => {
        setSearchMenuName(e.currentTarget.value);
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
            <div className={"search-container"}>
                <input className={""} type={"text"} value={searchPostPaidName} placeholder={"후불명부"} onChange={(e) => {searchPostPaidOnChangeHandler(e)}}/>
                <input className={""} type={"text"} value={searchMenuName} placeholder={"메뉴명"} onChange={(e) => {searchMenuNameOnchangeHandler(e)}}/>
                <button className={"search-btn"} onClick={getSaleHandler}>조회</button>
            </div>
            <table className={"sale-list-container"}>
                <tr className={"sale-title"}>
                    <th className={"regdate"}>주문일자</th>
                    <th className={"paydate"}>결제일자</th>
                    <th className={"paycompleteyn"}>결제여부</th>
                    <th className={"totalsaleprice"}>주문금액</th>
                    <th className={"totalpayprice"}>결제금액</th>
                    <th className={"cashpayprice"}>현금결제금액</th>
                    <th className={"cardpayprice"}>카드결제금액</th>
                    <th className={"deferredpayprice"}>후불결제금액</th>
                    <th className={"expectedrestprice"}>남은금액</th>
                    <th className={"menuname"}>주문메뉴</th>
                </tr>
                {
                    saleList.map((item) => {
                        return (
                            <tr className={"sale-card"}>
                                <td>{toStringByFormatting(item.regdate)}</td>
                                <td>{toStringByFormatting(item.paydate)}</td>
                                <td><input className={"paycompleteyn-input input"} type={"checkbox"} id={item.paycompleteyn} name={""} disabled checked={item.paycompleteyn}/></td>
                                <td>{item.totalsaleprice.toLocaleString()}</td>
                                <td>{item.totalpayprice.toLocaleString()}</td>
                                <td>{item.cashpayprice.toLocaleString()}</td>
                                <td>{item.cardpayprice.toLocaleString()}</td>
                                <td>{item.deferredpayprice.toLocaleString()}</td>
                                <td>{item.expectedrestprice.toLocaleString()}</td>
                                <td><p className={"sale-card-menuname"}>{item.menuname}</p></td>
                            </tr>
                        )
                    })
                }
                <tr className={"total-price-row"}>
                    <td>총합계</td>
                    <td></td>
                    <td></td>
                    <td className={"total-price-card"}>{totalSalePrice.toLocaleString()}</td>
                    <td className={"total-price-card"}>{totalPayPrice.toLocaleString()}</td>
                    <td className={"total-price-card"}>{totalCashPayPrice.toLocaleString()}</td>
                    <td className={"total-price-card"}>{totalCardPayPrice.toLocaleString()}</td>
                    <td className={"total-price-card"}>{totalDeferredPayPrice.toLocaleString()}</td>
                    <td className={"total-price-card"}>{totalExpectedRestPrice.toLocaleString()}</td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}

export default SaleManage;