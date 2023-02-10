import React from "react";
import {
    pay
} from "../connection/index";
import {useNavigate} from "react-router-dom";
import "../css/orderBtnComponent.css"
import PostPaidGroupList from "./PostPaidGroupList";

const OrderBtn = (props) => {
    /**
     *  props: space(테이블 정보), orderList(기존 주문내역), newOrderList(신규 주문내역), firstOrderYn(첫주문 여부)
     * @type {NavigateFunction}
     */

    const navigate = useNavigate();

    // const {state} = useLocation();  // 주문테이블 고유번호

    const orderClick = async () => {
        props.orderHandler();
    }

    const orderCancelClick = async () => {
        navigate("/tables");
    }

    const payClick = async (type) => {
        // const orderList = props.orderList;
        const space = props.space;
        const newSalePrice = props.newSalePrice;
        const reqPayPrice = sessionStorage.getItem("reqPayPrice");

        if (newSalePrice > 0) {
            alert("주문후에 결제를 진행해주세요.");
            return true;
        }

        if (reqPayPrice === "0" || reqPayPrice === "") {
            alert("결제 금액을 입력해주세요");
            return true;
        }

        const data = {
            orderinfopkey: space.orderinfopkey,
            reqPayPrice: reqPayPrice,
            type: type,
            spacepkey: space.spacepkey
        }

        if (type === "deferred") {
            // navigate("/postpaid-group/list", {state: data});
            return;
        }

        try{
            const result = await pay(data);
            navigate("/tables");
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

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

export default OrderBtn;