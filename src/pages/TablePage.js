import React from "react";
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