import React, {useState, useEffect} from "react";
import "../css/amountDashBoardComponent.css"

const AmountDashBoardComponent = (props) => {
    const [totalPayPrice, setTotalPayPrice] = useState(props.totalPayPrice);
    const [number, setNumber] = useState("");

    useEffect(() => {
        setTotalPayPrice(props.totalPayPrice === undefined? 0: props.totalPayPrice);
    }, [props.totalPayPrice])

    const numberBtnItems = [0, 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9]
    const controllerBtnItems = ['C', '<', 'Enter']

    const numBtnHandler = (e) => {
        const num = e.target.value.toString();
        setNumber(parseInt(number+num));
    }

    const ctnBtnHandler = (e) => {
        const ctn = e.target.value;
        if (ctn === "C") {
            setNumber("");
        } else if (ctn === "<") {
            // console.log("parseInt(number.slice(0, -1)) : ", parseInt(number.slice(0, -1)));
            if (number.toString().length > 1) {
                setNumber(parseInt(number.toString().slice(0, -1)));
            } else {
                setNumber(0);
            }
        } else {

        }
    }

    return (
        <div className={"board-container"}>
            <div className={"AmountDashBoard-container"}>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>총 금 액</p>
                    <p className={"orderTotalPrice-item"}>{props.totalSalePrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>추가주문 금액</p>
                    <p className={"orderTotalPrice-item"}>{props.newTotalPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>받은금액</p>
                    <p className={"orderTotalPrice-item"}>{totalPayPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>남은금액</p>
                    <p className={"orderTotalPrice-item"}>{props.expectedRestPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>거스름돈</p>
                    <p className={"orderTotalPrice-item"}>{0}</p>
                </div>
            </div>
            <div className={"numberBoard-container"}>
                <input value={number.toLocaleString()}/>
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

export default AmountDashBoardComponent;