import React, {useState, useEffect} from "react";
import axiosInstance from "../api/axiosClient";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import "../css/orderBtnComponent.css"

const OrderBtnComponent = (props) => {
    /**
     *  props: space(테이블 정보), orderList(기존 주문내역), newOrderList(신규 주문내역), firstOrderYn(첫주문 여부)
     * @type {NavigateFunction}
     */

    const navigate = useNavigate();

    const tablePageMove = () => {
        navigate("/tables");
    }

    const {state} = useLocation();  // 주문테이블 고유번호
    const [newOrderList, setNewOrderList] = useState([]);

    const orderClick = async () => {

        // 첫 주문, 재주문 분기처리
        if (props.firstOrderYn === true) {
            // 첫 주문
            const data = {
                spacepkey: state,
                ordermenulist: newOrderList,
                takeoutyn: false
            }
            const result = await axiosInstance.post("/order", data);
            if (result.status === 200) {
                tablePageMove();
            } else {
                alert("오류");
                tablePageMove();
            }
        } else {
            // 재주문

            const data = {
                orderinfopkey: props.space.orderinfopkey,
                orderList: props.orderList,
                newOrderList: props.newOrderList
            }
            const reOrder = await axiosInstance.post("/order/re", data);
            if (reOrder.status === 200) {
                tablePageMove();
            } else {
                alert("오류");
                tablePageMove();
            }
        }
    }

    const orderCancelClick = async () => {
        // 주문취소
        tablePageMove();
    }

    const payClick = async () => {

    }

    useEffect(() => {
        setNewOrderList(props.newOrderList);
        // return (() => {
        //     setNewOrderList(props.newOrderList);
        // })
    }, [props.newOrderList])

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