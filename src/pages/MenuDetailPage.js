import React, {useEffect, useState} from "react";
import MenuDetail from "../components/MenuDetail";
import {useLocation} from "react-router";


const MenuDetailPage = () => {

    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <MenuDetail/>
        </div>
    )
}

export default MenuDetailPage;