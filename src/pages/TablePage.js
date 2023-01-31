import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import TablesComponent from "../components/TablesComponent";
import SideNavComponent from "../components/SideNavComponent";

const TablePage = () => {
    return (
        <div style={{display: "flex"}}>
            <TablesComponent/>
            <SideNavComponent/>
        </div>
    )
}

export default TablePage;