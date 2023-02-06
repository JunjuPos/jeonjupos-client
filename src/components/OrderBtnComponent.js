import React, {useState, useEffect} from "react";
import {
    pay
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

    const payClick = async (type) => {
        alert(type)
        const orderList = props.orderList;
        const space = props.space;
        const newSalePrice = props.newSalePrice;
        const reqPayPrice = sessionStorage.getItem("reqPayPrice");

        const data = {
            orderinfopkey: space.orderinfopkey,
            reqPayPrice: reqPayPrice,
            type: "cash"
        }

        try{
            const result = await pay(data);
            console.log("pay result : ", result);
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }

        console.log("data : ", data);
    }

    // const cardPayClick = async () => {
    //
    // }

    return (
        <div className={"submitBtn-container"}>
            <button onClick={orderClick}>
                주문
            </button>
            <button onClick={orderCancelClick}>
                취소
            </button>
            <button onClick={(e) => payClick('cash')}>
                현금결제
            </button>
            <button onClick={(e) => payClick('card')}>
                카드결제
            </button>
            <button onClick={(e) => payClick('deferred')}>
                후불결제
            </button>
        </div>
    )
}

export default OrderBtnComponent;