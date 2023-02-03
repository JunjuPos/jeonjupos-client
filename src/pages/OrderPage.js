import React, {useState, useEffect} from "react";
import {useLocation} from "react-router";
import OrderListComponent from "../components/OrderListComponent";
import MenuListComponent from "../components/MenuListComponent";
import AmountDashBoardComponent from "../components/AmountDashBoardComponent";
import OrderBtnComponent from "../components/OrderBtnComponent";
import {
    getOrderList, order
} from "../api/axiosClient";
import {useNavigate} from "react-router-dom";

const OrderPage = (props) => {
    const {state} = useLocation();  // 주문테이블 고유번호                 // 테이블 고유번호
    const navigate = useNavigate();

    const [space, setSpace] = useState({
        expectedRestPrice: 0,
        orderinfopkey: 0,
        spacenum: 0,
        totalCount: 0,
        totalPayPrice: 0,
        totalSalePrice: 0
    });
    const [orderList, setOrderList] = useState([]);
    const [newSalePrice, setNewSalePrice] = useState(0);
    // let newSalePrice = 0;

    useEffect( () => {
        getOrderListCall();
    }, [])

    const getOrderListCall = async () => {
        try{
            let result = await getOrderList(state);
            console.log(result);
            if (result.status === 200) {
                if (result.data.res_code === "0000") {
                    const getOrderList = result.data.orderlist;
                    const getSpace = result.data.space;
                    if (getSpace !== null && getOrderList.length > 0) {
                        setOrderList(getOrderList);
                        setSpace(getSpace)
                    }
                } else {
                    alert("에러");
                }
            }
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    const menuOnClickHandler = (menupkey, saleprice, menuname, count) => {
        //  메뉴 버튼 클릭 시 newOrderList에 추가 및 추가 주문금액 state값 변경
        const idx = orderList.findIndex((item) => item.menupkey === menupkey);
        setNewSalePrice(newSalePrice + saleprice * count);
        if (idx > -1) {
            orderList[idx].count += count;
            orderList[idx].totalsaleprice = orderList[idx].saleprice * orderList[idx].count;
            setOrderList([...orderList]);
        } else {
            setOrderList(
                [
                    ...orderList,
                    {
                        menupkey: menupkey,
                        saleprice: saleprice,
                        menuname: menuname,
                        count: count,
                        totalsaleprice: saleprice * count,
                        ordermenupkey: 0
                    }
                ]
            )
        }
    }

    const orderHandler = async () => {
        // 주문
        console.log("spacepkey : ", space.spacepkey);
        console.log("orderinfopkey : ", space.orderinfopkey);
        console.log("orderList : ", orderList);

        const data = {
            spacepkey: parseInt(localStorage.getItem("spacepkey")),
            orderinfopkey: space.orderinfopkey,
            ordermenulist: orderList,
            takeoutyn: false,
            firstorderyn: space.orderinfopkey === 0     // 0이면 최초주문 아니면 재주문
        }

        try{
            const orderRes = await order(data);
            console.log("orderRes : ", orderRes)
            if (orderRes.status === 200) {
                navigate("/tables");
            }
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }

    const countCntOnClickHandler = (menupkey, type) => {
        // +, - 버튼 클릭 시 order, newOrder 구분은 해당 메뉴
        const idx = orderList.findIndex((item) => item.menupkey === menupkey);
        if (idx > -1) {
            if (type === "plus") {
                orderList[idx].count += 1
                orderList[idx].totalsaleprice = orderList[idx].saleprice * orderList[idx].count;
                setNewSalePrice(newSalePrice + orderList[idx].saleprice);
                setOrderList([...orderList]);
            } else {
                setNewSalePrice(newSalePrice - orderList[idx].saleprice);
                if (orderList[idx].count > 1) {
                    orderList[idx].count = orderList[idx].count - 1
                    orderList[idx].totalsaleprice = orderList[idx].saleprice * orderList[idx].count;
                    setOrderList([...orderList]);
                } else if (orderList[idx].count === 1) {
                    orderList.splice(idx, 1)
                    setOrderList([...orderList]);
                } else {
                    orderList.splice(idx, 1)
                    setOrderList([...orderList]);
                }
            }
        }
    }

    return (
        <div style={{flex: "1 0 auto", display: "inline-flex", alignItems: "flex-start", width: "100%", height: "90%"}}>
            <div style={{flex: "1", marginLeft: "10px", width: "100%", height: "100%"}}>
                <OrderListComponent
                    orderList={orderList}
                    countCntOnClickHandler={countCntOnClickHandler}
                />
                <AmountDashBoardComponent
                    space={space}
                    newSalePrice={newSalePrice}
                />
            </div>
            <div style={{flex: "1", marginLeft: "10px", marginRight: "10px", width: "100%", height: "100%"}}>
                <MenuListComponent
                    menuOnClickHandler={menuOnClickHandler}
                />
                <OrderBtnComponent
                    orderHandler={orderHandler}
                />
            </div>
        </div>
    )
}

export default OrderPage;