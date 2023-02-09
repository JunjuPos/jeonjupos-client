import React, {useState, useEffect} from "react";
import "../css/amountDashBoardComponent.css"

const AmountDashBoard = (props) => {

    useEffect(() => {
        sessionStorage.setItem("reqPayPrice", 0);
    }, []);

    const [number, setNumber] = useState(0);

    const numberBtnItems = [1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9, 0, "00"]
    const controllerBtnItems = ['C', '<', 'Enter', '전체']

    const numBtnHandler = (e) => {
        const num = e.target.value.toString();
        sessionStorage.setItem("reqPayPrice", parseInt(number + num));
        setNumber(parseInt(number+num));
    }

    const ctnBtnHandler = (e) => {
        const ctn = e.target.value;
        if (ctn === "C") {
            sessionStorage.setItem("reqPayPrice", 0);
            setNumber(0);
        } else if (ctn === "<") {
            if (number.toString().length > 1) {
                sessionStorage.setItem("reqPayPrice", parseInt(number.toString().slice(0, -1)));
                setNumber(parseInt(number.toString().slice(0, -1)));
            } else {
                sessionStorage.setItem("reqPayPrice", 0);
                setNumber(0);
            }
        } else if (ctn === "전체") {
            if (props.space.expectedRestPrice > 0) {
                //  남은 금액은 0보다 크면 한번 결제한 경우
                //  따라서 남은 금액만큼 세팅한다.
                sessionStorage.setItem("reqPayPrice", props.space.expectedRestPrice);
                setNumber(props.space.expectedRestPrice);
            } else {
                //  최초 결제 이기때문에 전체 금액으로 세팅함
                sessionStorage.setItem("reqPayPrice", props.space.totalSalePrice + props.newSalePrice);
                setNumber(props.space.totalSalePrice + props.newSalePrice);
            }
        } else {

        }
    }

    return (
        <div className={"board-container"}>
            <div className={"AmountDashBoard-container"}>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>총 금 액</p>
                    <p className={"orderTotalPrice-item"}>{(props.space.totalSalePrice + props.newSalePrice).toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>추가주문 금액</p>
                    <p className={"orderTotalPrice-item"}>{props.newSalePrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>받은금액</p>
                    <p className={"orderTotalPrice-item"}>{props.space.totalPayPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>남은금액</p>
                    <p className={"orderTotalPrice-item"}>{props.space.expectedRestPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>거스름돈</p>
                    <p className={"orderTotalPrice-item"}>{0}</p>
                </div>
            </div>
            <div className={"numberBoard-container"}>
                <input value={number.toLocaleString()} placeholder={"결제할 금액을 입력해주세요."}/>
                <div className={"numberBoard"}>
                    {
                        numberBtnItems.map((item, index) => {
                            return (
                                <button className={"numberItem numberItem" + index.toString()} value={item} onClick={(e) => {numBtnHandler(e)}}>
                                    {item}
                                </button>
                            )
                        })
                    }
                    {
                        controllerBtnItems.map((item, index) => {
                            return (
                                <button className={"numberItem numberItem" + index.toString()} value={item} onClick={(e) => {ctnBtnHandler(e)}}>
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AmountDashBoard;