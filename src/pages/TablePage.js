import React from "react";
import Tables from "../components/Tables";
import SideNav from "../components/SideNav";

const TablePage = () => {
    return (
        <div style={{display: "flex"}}>
            <Tables/>
            <SideNav/>
        </div>
    )
}

export default TablePage;