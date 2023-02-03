import React, {useState, useEffect} from "react";
import {
    orderModify
} from "../api/axiosClient";
import "../css/orderListComponent.css";
import {useNavigate} from "react-router-dom";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OrderListComponent = (props) => {
    const navigate = useNavigate();
    const tablePageMove = () => {
        navigate("/tables");
    }

    // console.log("props : ", props)
    const [totalCount, setTotalCount] = useState(0);
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    const [menupkey, setMenupkey] = useState(0);
    const [orderCardActive, setOrderCardActive] = useState("");

    useEffect(() => {
        //  props.orderList, props.newOrderList 변경 시 실행

        const totalSalePriceArr = props.orderList.map((item) => item.totalsaleprice);
        setTotalSalePrice(totalSalePriceArr.reduce((acc, cur) => {return acc + cur}, 0));

        const totalCountArr = props.orderList.map((item) => item.count);
        setTotalCount(totalCountArr.reduce((acc, cur) => {return acc + cur}, 0));

    }, [props.orderList])

    const orderClickHandler = async (e, ordermenupkey, menupkey) => {
        setMenupkey(menupkey);

        // 현재 클릭한 행 활성화
        setOrderCardActive(() => {
            return e.target.id;
        })
    }

    const countOnClick = (type) => {
        props.countCntOnClickHandler(menupkey, type);
    }

    return (
        <div className={"orderListArea"}>
            <div className={"orderListHeader"}>
                <p className={"orderListHeader-item"}>순서</p>
                <p className={"orderListHeader-item"}>메뉴명</p>
                <p className={"orderListHeader-item"}>개수</p>
                <p className={"orderListHeader-item"}>단가</p>
                <p className={"orderListHeader-item"}>가격</p>
            </div>
            <div className={"orderList"}>
                {
                    props.orderList.map((order, index) => {
                        return (
                            <div
                                id={index}
                                className={'orderList-row order order-card' + (index === parseInt(orderCardActive) ? '-active': "")}
                                onClick={(e) => {orderClickHandler(e, order.ordermenupkey, order.menupkey)}}
                            >
                                <p className={"orderList-item"}>{index+1}</p>
                                <p className={"orderList-item"}>{order.menuname}</p>
                                <p className={"orderList-item"}>{order.count}</p>
                                <p className={"orderList-item"}>{order.saleprice.toLocaleString()}</p>
                                <p className={"orderList-item"}>{(order.saleprice * order.count).toLocaleString()}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={"total-items"}>
                <p className={"total-title"}>합계</p>
                <p className={"total-count"}>{totalCount.toLocaleString()}</p>
                <p className={"total-count"}></p>
                <p className={"total-price"}>{totalSalePrice.toLocaleString()}</p>
            </div>
            <div className={"countController-container"}>
                <button className={""}>전체취소</button>
                <button className={""}>선택취소</button>
                <button className={"countController-plus"} onClick={(e) => countOnClick("plus")}>+</button>
                <button className={"countController-minus"} onClick={(e) => countOnClick("minus")}>-</button>
            </div>
        </div>
    )
}

export default OrderListComponent;