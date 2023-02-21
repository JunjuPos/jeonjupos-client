import React from "react";
import MenuDetail from "../components/MenuDetail";
import {useLocation} from "react-router";


const MenuDetailPage = () => {
    const {state} = useLocation();

    return (
        <MenuDetail menupkey={state}/>
    )
}

export default MenuDetailPage;