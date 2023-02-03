import React, {useState, useEffect} from "react";
import {
    order,
    reOrder
} from "../api/axiosClient";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import "../css/orderBtnComponent.css"

const OrderBtnComponent = (props) => {
    /**
     *  props: space(테이블 정보), orderList(기존 주문내역), newOrderList(신규 주문내역), firstOrderYn(첫주문 여부)
     * @type {NavigateFunction}
     */

    const navigate = useNavigate();

    const {state} = useLocation();  // 주문테이블 고유번호

    const orderClick = async () => {
        props.orderHandler();
    }

    const orderCancelClick = async () => {
        navigate("/tables");
    }

    const payClick = async () => {

    }

    return (
        <div className={"submitBtn-container"}>
            <button onClick={orderClick}>
                주문
            </button>
            <button onClick={orderCancelClick}>
                취소
            </button>
            <button onClick={payClick}>
                결제
            </button>
            <button>
                부분결제
            </button>
        </div>
    )
}

export default OrderBtnComponent;