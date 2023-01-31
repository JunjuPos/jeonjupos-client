import React, {useState, useEffect} from "react";
import "../css/amountDashBoardComponent.css"

const AmountDashBoardComponent = (props) => {
    const [totalPrice, setTotalPrice] = useState(props.totalPrice);

    useEffect(() => {
        setTotalPrice(props.totalPrice === undefined? 0: props.totalPrice);
    }, [props.totalPrice])

    useEffect(() => {
        // 추가 주문 있을 경우
        setTotalPrice((props.totalPrice !== 0? props.totalPrice : 0) + props.newTotalPrice); // 주문완료한 총 금액 + 추가 주문 금액
    }, [props.newTotalPrice])

    const numberBoardItems = [0, 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9, 'C', '<', 'Enter']

    return (
        <div style={{display: "flex", marginTop: "60px"}}>
            <div className={"AmountDashBoard-container"}>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>총 금 액</p>
                    <p className={"orderTotalPrice-item"}>{totalPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>추가주문 금액</p>
                    <p className={"orderTotalPrice-item"}>{props.newTotalPrice.toLocaleString()}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>받을금액</p>
                    <p className={"orderTotalPrice-item"}>{0}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>받은금액</p>
                    <p className={"orderTotalPrice-item"}>{0}</p>
                </div>
                <div className={"orderTotalPrice"}>
                    <p className={"orderTotalPrice-title"}>거스름돈</p>
                    <p className={"orderTotalPrice-item"}>{0}</p>
                </div>
            </div>
            <div className={"numberBoard-container"}>
                <input/>
                <div className={"numberBoard"}>
                    {
                        numberBoardItems.map((item, index) => {
                            return (
                                <button className={"numberItem numberItem" + index.toString()}>
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