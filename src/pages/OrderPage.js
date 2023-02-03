import React, {useState, useEffect} from "react";
import {useLocation} from "react-router";
import OrderListComponent from "../components/OrderListComponent";
import MenuListComponent from "../components/MenuListComponent";
import AmountDashBoardComponent from "../components/AmountDashBoardComponent";
import OrderBtnComponent from "../components/OrderBtnComponent";
import axiosInstance from "../api/axiosClient";

const OrderPage = () => {
    const {state} = useLocation();  // 주문테이블 고유번호                 // 테이블 고유번호
    const [newOrderList, setNewOrderList] = useState([]);   // 추가 주문한 메뉴 리스트
    const [orderCount, setOrderCount] = useState(0);        // 메뉴 클릭시 useEffect를 위한 변수
    const [newTotalPrice, setNewTotalPrice] = useState(0);  // 추가 주문된 결제금액
    const [totalPrice, setTotalPrice] = useState(0);        // 총 결제금액
    const [orderList, setOrderList] = useState([])          // 주문완료한 주문내역
    const [space, setSpace] = useState({});                 // 테이블 정보
    const [firstOrderYn, setFirstOrderYn] = useState(false);    // 첫 주문 여부
    const [expectedRestPrice, setExpectedRestPrice] = useState(0);

    useEffect(() => {
        getOrderList();
        // return (async () => {
        //     await getOrderList();
        //     console.log("orderList : ", orderList);
        // })
    }, [])

    const getOrderList = async () => {
        let result = await axiosInstance.get(
            "/space/order/list?spacepkey=" + state,
            {
            headers: {
                jwt: `${localStorage.getItem("jwt")}`
            }
        });
        console.log(result);
        if (result.status === 200) {
            if (result.data.res_code === "0000") {
                setOrderList(result.data.orderlist);
                setSpace(result.data.space === null? {}: result.data.space);
                setFirstOrderYn(result.data.space === null)
                setExpectedRestPrice(result.data.space === null? 0 : result.data.space.expectedrestprice);
            } else {
                alert("에러");
            }
        } else {
            alert("에러");
        }
    }

    // 하위 컴포넌트에게 함수로 넘겨주고 하위 컴포넌트는 props로 전달받은 함수로 상위 컴포넌트한테 전달한다.
    // 메뉴 클릭 시
    const menuClick = (menupkey, saleprice, menuname, count) => {
        let getmenulist = newOrderList.find((item, idx) => {
            return item.menupkey === menupkey;
        })
        if (getmenulist === undefined) {
            // setNewOrderList((newOrderList) => {
            //     return [...newOrderList, {menupkey: menupkey, saleprice: saleprice, count: count, menuname: menuname, discount: 0}]
            // })
            setNewOrderList([...newOrderList, {menupkey: menupkey, saleprice: saleprice, count: count, menuname: menuname, discount: 0}])
        } else {
            // 중복되는 메뉴 존재 시 카운트만 증가
            const index = newOrderList.findIndex((e) => e.menupkey === menupkey);
            if (index >= 0 && newOrderList[index].count === 1 && count === -1) {
                newOrderList.splice(index, 1);
                setNewOrderList(newOrderList);
            } else if (index >= 0) {
                if (newOrderList[index].count > 0){
                    newOrderList[index].count = newOrderList[index].count + count
                } else {

                }
            } else if (index < 0) {

            }
        }
        setOrderCount(orderCount + 1);
    }

    const getDashBoard = (space) => {
        setTotalPrice(space.totalpayprice === undefined? 0 : space.totalpayprice);
        setExpectedRestPrice(space.expectedrestprice === undefined? 0 : space.expectedrestprice);
    }

    const getNewTotalPrice = () => {
        let totalPriceArr = newOrderList.map((newOrder) => {
            return newOrder.saleprice * newOrder.count;
        })
        setNewTotalPrice(totalPriceArr.length === 0? 0: totalPriceArr.reduce((sum, currentValue) => {
                return sum + currentValue;
            })
        )
    }

    const reRendering = () => {
        getOrderList();
    }

    useEffect(() => {
        getNewTotalPrice();
    }, [orderCount])

    return (
        <div style={{flex: "1 0 auto", display: "inline-flex", alignItems: "flex-start", width: "100%", height: "90%"}}>
            <div style={{flex: "1", marginLeft: "10px", width: "100%", height: "100%"}}>
                <OrderListComponent orderList={orderList} space={space} newOrderList={newOrderList} getDashBoard={getDashBoard} menuClick={menuClick} reRendering={reRendering}/>
                <AmountDashBoardComponent totalPrice={totalPrice} newTotalPrice={newTotalPrice} expectedRestPrice={expectedRestPrice}/>
            </div>
            <div style={{flex: "1", marginLeft: "10px", marginRight: "10px", width: "100%", height: "100%"}}>
                <MenuListComponent menuClick={menuClick}/>
                <OrderBtnComponent newOrderList={newOrderList} firstOrderYn={firstOrderYn} space={space} orderList={orderList}/>
            </div>
        </div>
    )
}

export default OrderPage;