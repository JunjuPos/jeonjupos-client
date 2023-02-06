import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTableList} from "../api/axiosClient";
import "../css/tablesComponent.css";

const TablesComponent = () => {
    const navigate = useNavigate();

    localStorage.setItem("spacepkey", "0")

    const orderNavigate = (spacenum, spacepkey) => {
        localStorage.setItem("spacepkey", spacepkey.toString())
        navigate("/order", {state: spacenum});
    }

    const [spaceList, setSpaceList] = useState([]);

    const getSpaceList = async () => {
        try{
            const spaceListRes = await getTableList();
            if (spaceListRes.status === 200) {
                if (spaceListRes.data.res_code === "0000") {
                    setSpaceList(spaceListRes.data.spacelist);
                } else {
                    alert(setSpaceList.data.message)
                }
            } else {
                alert("api 통신 실패")
            }
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    useEffect(() => {
        getSpaceList();
    }, []);

    return (
        <div className={"space-container"}>
            {
                spaceList.map((table) => {
                    console.log("table : ", table);
                    return (
                        <div
                            className={"space-card spaceCard" + table.spacenum.toString()}
                            key={"td" + table.spacenum}
                            onClick={(e) => {orderNavigate(table.spacenum, table.spacepkey)}}
                        >
                            <p className={"tableNum"} id={"tableNum" + table.spacenum} key={"tableNum" + table.spacenum}>
                                {table.spacenum} {table.eatingyn === 1? "식사중": "비어있음"}
                            </p>
                            <div className={"space-card-body"}>
                                <div className={"menuCard"}>
                                    {
                                        table.orderlist.map((order) => {
                                            return (
                                                <div>
                                                    <p className={"menuName"}>{order.menuname}</p>
                                                    <p className={"menuCount"}> {order.menucount}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <p className={"totalPrice"}>{table.amount.toLocaleString()}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TablesComponent;