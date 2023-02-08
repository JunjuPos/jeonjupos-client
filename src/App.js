import React, {useState} from "react";
import IndexPage from "./pages/IndexPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TablePage from "./pages/TablePage";
import HeaderComponent from "./components/HeaderComponent";
import OrderPage from "./pages/OrderPage";
import "./css/main.css"
import {MyContext} from "./contexts/MyContext";
import MenuManagePage from "./pages/MenuManagePage";
import SaleManageComponent from "./components/SaleManageComponent";

const App = () => {

    const [storename, setStorename] = useState("");

    return (
        <MyContext.Provider value={{storename, setStorename}}>
            <div className={"AppArea"}>
                <Router>
                    <HeaderComponent/>
                    <Routes>
                        <Route exact path={"/"} element={<IndexPage/>}></Route>
                        <Route exact path={"/tables"} element={<TablePage/>}></Route>
                        <Route exact path={"/order"} element={<OrderPage/>}></Route>
                        <Route exact path={"/menu/manage"} element={<MenuManagePage/>}></Route>
                        <Route exact path={"/sale/manage"} element={<SaleManageComponent/>}></Route>
                    </Routes>
                </Router>
            </div>
        </MyContext.Provider>
    );
}

export default App;
