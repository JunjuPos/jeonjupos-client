import React from "react";
import "../css/sideNavComponent.css"
import {useNavigate} from "react-router-dom";

const SideNavComponent = () => {

    const navigate = useNavigate();

    const sideCardList = [
        {name: "메뉴관리", id: "menu-manage"},
        {name: "매출관리", id: "sale-manage"},
        {name: "배달관리", id: "delivery-manage"},
        {name: "판매현황", id: "order-manage"},
        {name: "주문서조회", id: "orderinfo-manage"},
    ]

    const sideMenuOnClickHandler = (e) => {
        const id = e.currentTarget.id;
        if (id === "menu-manage") {
            navigate("/menu/manage");
        } else if (id === "sale-manage") {
            navigate("/sale/manage");
        }
    }

    return (
        <div className={"sideNav-container"}>
            {
                sideCardList.map((sideCard) => {
                    return (
                        <div>
                            <li className={"sideNavCard"} id={sideCard.id} onClick={(e) => {sideMenuOnClickHandler(e)}}>
                                {sideCard.name}
                            </li>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SideNavComponent;