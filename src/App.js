import React, {useState} from "react";
import IndexPage from "./pages/IndexPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TablePage from "./pages/TablePage";
import Header from "./components/Header";
import OrderPage from "./pages/OrderPage";
import "./css/main.css"
import {MyContext} from "./contexts/MyContext";
import MenuManagePage from "./pages/MenuManagePage";
import SaleManage from "./components/SaleManage";
import PostPaidGroupList from "./components/PostPaidGroupList";

const App = () => {

    const [storename, setStorename] = useState("");
    const [manageMenuCategoryPkey, setManageMenuCategoryPkey] = useState(0);

    return (
        <MyContext.Provider value={{storename, setStorename, manageMenuCategoryPkey, setManageMenuCategoryPkey}}>
            <div className={"AppArea"}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route exact path={"/"} element={<IndexPage/>}></Route>
                        <Route exact path={"/tables"} element={<TablePage/>}></Route>
                        <Route exact path={"/order"} element={<OrderPage/>}></Route>
                        <Route exact path={"/menu/manage"} element={<MenuManagePage/>}></Route>
                        <Route exact path={"/sale/manage"} element={<SaleManage/>}></Route>
                        <Route exact path={"/postpaid-group/list"} element={<PostPaidGroupList/>}></Route>
                    </Routes>
                </Router>
            </div>
        </MyContext.Provider>
    );
}

export default App;
