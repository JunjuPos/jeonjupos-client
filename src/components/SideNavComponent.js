import React from "react";
import "../css/sideNavComponent.css"

const SideNavComponent = () => {

    const sideCardList = [
        {name: "메뉴관리"},
        {name: "매출관리"},
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