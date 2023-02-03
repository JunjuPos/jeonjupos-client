import React, {useState, useEffect, useRef} from "react";
import {useLocation} from "react-router";
import axiosInstance from "../api/axiosClient";
import "../css/orderListComponent.css";
import {useNavigate} from "react-router-dom";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OrderListComponent = (props) => {
    const [orderList, setOrderList] = useState(props.orderList);     // 주문내역
    const [newOrderList, setNewOrderList] = useState([]);     // 주문내역
    const [space, setSpace] = useState({});             // 테이블 정보
    const [orderMenuPkey, setOrderMenuPkey] = useState(0);    // 선택 주문

    const [orderCardActive, setOrderCardActive] = useState("");
    const [newOrderCardActive, setNewOrderCardActive] = useState("");

    const [countModifyType, setCountModifyType] = useState("");
    const [newOrder, setNewOrder] = useState(0);
    const [orderInfoPkey, setOrderInfoPkey] = useState(0);

    useEffect(() => {
        setOrderList(props.orderList);
        setSpace(props.space);
        setOrderCardActive("");
        setCountModifyType("");
    }, [props.orderList])

    useEffect(() => {
        setNewOrderList(props.newOrderList);
        setNewOrderCardActive("");
        setCountModifyType("");
    }, [props.newOrderList])

    useEffect(() => {
        props.getDashBoard(space);
    }, [space])

    // 주문내역 click
    const orderClickHandler = async (e, ordermenupkey, orderInfoPkey) => {
        setOrderMenuPkey(ordermenupkey);
        setOrderInfoPkey(orderInfoPkey);
        setCountModifyType("old");

        // 현재 클릭한 행 활성화
        setOrderCardActive(() => {
            return e.target.id;
        })
        // 이전에 클릭한 행 비활성
        setNewOrderCardActive("");
    }

    const newOrderClickHandler = async (e, newOrder) => {
        setNewOrder(newOrder);
        setCountModifyType("new");

        // 현재 클릭한 행 활성화
        setNewOrderCardActive(() => {
            return e.target.id.toString();
        })
        // 이전에 클릭한 행 비활성
        setOrderCardActive("");
    }

    // + - 버튼 클릭
    const countOnClick = async (type) => {
        console.log(countModifyType);
        if (countModifyType === "old") {
            // 기존 주문건
            try{
                let result = await axiosInstance.post(
                    '/order/modify',
                    {
                        ordermenupkey: orderMenuPkey,
                        orderInfoPkey: orderInfoPkey,
                        type: type
                    },
                    {
                        headers: {
                            jwt: `${localStorage.getItem("jwt")}`
                        }
                    }
                );
                console.log("result : ", result);
            } catch (err) {

            }
            props.reRendering();
        } else if (countModifyType === "new") {
            // 신규 주문건
            if (type === "plus") {
                props.menuClick(newOrder.menupkey, newOrder.saleprice, newOrder.menuname, 1);
            } else {
                props.menuClick(newOrder.menupkey, newOrder.saleprice, newOrder.menuname, -1);
            }

            if (newOrderList.find((item, idx) => item.menupkey === newOrder.menupkey) === undefined) {
                //  추가 주문 메뉴 개수 수정 시 newOrderList에서 삭제되면 reRendering
                props.reRendering();
            }
        } else {

        }
    }

    return (
        <div className={"orderListArea"}>
            <div className={"orderListHeader"}>
                <p className={"orderListHeader-item"}>순서</p>
                <p className={"orderListHeader-item"}>메뉴명</p>
                <p className={"orderListHeader-item"}>개수</p>
                <p className={"orderListHeader-item"}>가격</p>
            </div>
            <div className={"orderList"}>
                {
                    orderList.map((order, index) => {
                        return (
                            <div id={index} className={'orderList-row order orderCard' + (index === parseInt(orderCardActive) ? ' active': "")} onClick={(e) => {orderClickHandler(e, order.ordermenupkey, order.orderinfopkey)}}>
                                <p id={index} className={"orderList-item" + (index === parseInt(orderCardActive) ? ' active': "")}>{index+1}</p>
                                <p id={index} hidden={true}>{order.menupkey}</p>
                                <p id={index} hidden={true}>{order.ordermenupkey}</p>
                                <p id={index} className={"orderList-item" + (index === parseInt(orderCardActive) ? ' active': "")}>{order.menuname}</p>
                                <p id={index} className={"orderList-item" + (index === parseInt(orderCardActive) ? ' active': "")}>{order.count}</p>
                                <p id={index} className={"orderList-item" + (index === parseInt(orderCardActive) ? ' active': "")}>{(order.saleprice * order.count).toLocaleString()}</p>
                            </div>
                        )
                    })
                }
                {
                    newOrderList.map((order, index) => {
                        return (
                            <div id={"new" + index.toString()} className={"orderList-row newOrderList-row newOrder"  + ("new" + index.toString() === newOrderCardActive ? ' newActive': "")} onClick={(e) => {newOrderClickHandler(e, order)}}>
                                <p id={"new" + index.toString()} className={"orderList-item" + ("new" + index.toString() === newOrderCardActive ? ' newActive': "")}>{index+1}</p>
                                <p id={"new" + index.toString()} hidden={true}>{order.menupkey}</p>
                                <p id={"new" + index.toString()} className={"orderList-item" + ("new" + index.toString() === newOrderCardActive ? ' newActive': "")} onClick={(e) => {newOrderClickHandler(e)}}>{order.menuname}</p>
                                <p id={"new" + index.toString()} className={"orderList-item" + ("new" + index.toString() === newOrderCardActive ? ' newActive': "")} onClick={(e) => {newOrderClickHandler(e)}}>{order.count}</p>
                                <p id={"new" + index.toString()} className={"orderList-item" + ("new" + index.toString() === newOrderCardActive ? ' newActive': "")} onClick={(e) => {newOrderClickHandler(e)}}>{order.saleprice.toLocaleString()}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={"total-items"}>
                <p className={"total-title"}>합계</p>
                <p className={"total-count"}>0</p>
                <p className={"total-price"}>0</p>
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