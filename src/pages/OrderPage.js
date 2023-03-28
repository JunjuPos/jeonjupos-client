import React, {useState, useEffect} from "react";
import {useLocation} from "react-router";
import OrderList from "../components/OrderList";
import MenuList from "../components/MenuList";
import AmountDashBoard from "../components/AmountDashBoard";
import OrderBtn from "../components/OrderBtn";
import {
    getTableOrderList, order
} from "../connection/index";
import {useNavigate} from "react-router-dom";
import PostPaidGroupList from "../components/PostPaidGroupList";

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
    const [newOrderList, setNewOrderList] = useState([]);
    const [newSalePrice, setNewSalePrice] = useState(0);
    const [viewMenuList, setViewMenuList] = useState(true);

    useEffect( () => {
        getTableOrderListCall();
    }, []);

    const getTableOrderListCall = async () => {
        try{
            let result = await getTableOrderList(state);
            if (result.status === 200) {
                if (result.data.res_code === "0000") {
                    const getOrderList = result.data.orderlist;
                    const getSpace = result.data.space;

                    if (getOrderList.length > 0) setOrderList(getOrderList);
                    if (getSpace !== null) setSpace(getSpace)
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

    const orderHandler = async () => {
        // 주문
        const data = {
            spacepkey: parseInt(localStorage.getItem("spacepkey")),
            orderinfopkey: space.orderinfopkey,
            ordermenulist: orderList,
            takeoutyn: false,
            firstorderyn: space.orderinfopkey === 0     // 0이면 최초주문 아니면 재주문
        }

        try{
            const orderRes = await order(data);
            if (orderRes.data.res_code === "0000") {
                navigate("/tables");
            } else {
                alert(orderRes.data.message);
            }
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    const orderListInit = () => {
        // 전체취소
        // orderList.map((item) => {return item.cancelyn = false});
        setOrderList(orderList.map((item) => {
            return {...item, cancelyn: true}
        }));
        setNewSalePrice(0);
    }

    const orderListChoiceInit = (menupkey) => {
        // 선택취소
        const idx = orderList.findIndex((item) => item.menupkey === menupkey);
        orderList[idx].cancelyn = true;
        orderList[idx].count = 0;
        setNewSalePrice(newSalePrice - orderList[idx].totalsaleprice);
        setOrderList([...orderList]);
        console.log("orderlist : ", orderList);
    }

    const menuOnClickHandler = (menupkey, saleprice, menuname, count) => {
        //  메뉴 버튼 클릭 시 newOrderList에 추가 및 추가 주문금액 state값 변경
        const idx = orderList.findIndex((item) => item.menupkey === menupkey);
        setNewSalePrice(newSalePrice + saleprice * count);
        if (idx > -1) {
            orderList[idx].cancelyn = false;
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
                        ordermenupkey: 0,
                        cancelyn: false
                    }
                ]
            )
        }

        const newIdx = newOrderList.findIndex((item) => item.menupkey === menupkey);
        if (newIdx > -1) {
            newOrderList[idx].count += count;
            setNewOrderList([...newOrderList]);
        } else {
            setNewOrderList(
                [
                    ...newOrderList,
                    {
                        menupkey: menupkey,
                        saleprice: saleprice,
                        menuname: menuname,
                        count: count,
                        totalsaleprice: saleprice * count,
                    }
                ]
            )
        }
    }

    const countCntOnClickHandler = (menupkey, type) => {
        // +, - 버튼 클릭 시 order, newOrder 구분은 해당 메뉴
        const idx = orderList.findIndex((item) => item.menupkey === menupkey);
        if (idx > -1) {
            if (type === "plus") {
                //  수량 +1
                orderList[idx].count += 1
                orderList[idx].totalsaleprice = orderList[idx].saleprice * orderList[idx].count;
                setNewSalePrice(newSalePrice + orderList[idx].saleprice);
                setOrderList([...orderList]);
            } else {
                //  수량 -1
                setNewSalePrice(newSalePrice - orderList[idx].saleprice);
                if (orderList[idx].count > 1) {
                    //  수량 -1
                    orderList[idx].count = orderList[idx].count - 1
                    orderList[idx].totalsaleprice = orderList[idx].saleprice * orderList[idx].count;
                    setOrderList([...orderList]);
                } else {
                    //  주문 메뉴 리스트에서 제거
                    // orderList.splice(idx, 1)
                    orderList[idx].cancelyn = true;
                    setOrderList([...orderList]);
                }
            }
        }
    }

    const viewMenuListHandler = () => {
        setViewMenuList(viewMenuList !== true);
    }

    return (
        <div style={{flex: "1 0 auto", display: "inline-flex", alignItems: "flex-start", width: "100%", height: "90%"}}>
            <div style={{flex: "1", marginLeft: "10px", width: "100%", height: "100%"}}>
                <OrderList
                    orderList={orderList}
                    countCntOnClickHandler={countCntOnClickHandler}
                    orderListInit={orderListInit}
                    orderListChoiceInit={orderListChoiceInit}
                    viewMenuListHandler={viewMenuListHandler}
                />
                <AmountDashBoard
                    space={space}
                    newSalePrice={newSalePrice}
                />
            </div>
            <div style={{flex: "1", marginLeft: "10px", marginRight: "10px", width: "100%", height: "100%"}}>
                {
                    viewMenuList ?
                        <MenuList menuOnClickHandler={menuOnClickHandler}/>: <PostPaidGroupList space={space} newSalePrice={newSalePrice} orderList={orderList}/>
                }
                {/*<MenuList menuOnClickHandler={menuOnClickHandler}/>*/}
                <OrderBtn
                    orderHandler={orderHandler}
                    space={space}
                    newSalePrice={newSalePrice}
                    orderList={orderList}
                    newOrderList={newOrderList}
                />
            </div>
        </div>
    )
}

export default OrderPage;