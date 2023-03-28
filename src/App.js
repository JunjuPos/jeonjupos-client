import React, {useState} from "react";
import IndexPage from "./pages/IndexPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TablePage from "./pages/TablePage";
import Header from "./components/Header";
import OrderPage from "./pages/OrderPage";
import "./css/main.css"
import {MyContext} from "./contexts/MyContext";
import MenuManageListPage from "./pages/MenuManageListPage";
import SaleManage from "./components/SaleManage";
import PostPaidGroupList from "./components/PostPaidGroupList";
import MenuDetailPage from "./pages/MenuDetailPage";

const App = () => {

    const [storename, setStorename] = useState("");
    const [manageMenuCategoryPkey, setManageMenuCategoryPkey] = useState(0);
    const [postPaidGroupPkey, setPostPaidGroupPkey] = useState(null);

    return (
        <MyContext.Provider value={
            {
                storename, setStorename,
                manageMenuCategoryPkey, setManageMenuCategoryPkey,
                postPaidGroupPkey, setPostPaidGroupPkey
            }
        }>
            <div className={"AppArea"}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route exact path={"/"} element={<IndexPage/>}></Route>
                        <Route exact path={"/tables"} element={<TablePage/>}></Route>
                        <Route exact path={"/order"} element={<OrderPage/>}></Route>
                        <Route exact path={"/manage/menu/list"} element={<MenuManageListPage/>}></Route>
                        <Route exact path={"/manage/sale/list"} element={<SaleManage/>}></Route>
                        <Route exact path={"/postpaid-group/list"} element={<PostPaidGroupList/>}></Route>
                        <Route exact path={"/manage/menu"} element={<MenuDetailPage/>}></Route>
                    </Routes>
                </Router>
            </div>
        </MyContext.Provider>
    );
}

export default App;
