import React from "react";
import "../css/sideNavComponent.css"

const SideNavComponent = () => {

    const sideCardList = [
        {name: "메뉴관리"},
        {name: "매출관리"},
        {name: "배달관리"},
        {name: "판매현황"},
        {name: "주문서조회"},
    ]

    return (
        <div className={"sideNav-container"}>
            {
                sideCardList.map((sideCard) => {
                    return (
                        <div>
                            <li className={"sideNavCard"}>
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