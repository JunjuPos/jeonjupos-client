import React, {useState, useEffect} from "react";
import IndexPage from "./pages/IndexPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TablePage from "./pages/TablePage";
import HeaderComponent from "./components/HeaderComponent";
import OrderPage from "./pages/OrderPage";
import "./css/main.css"

const App = () => {

    return (
        <body>
            <div className={"AppArea"}>
                <Router>
                    <HeaderComponent/>
                    <Routes>
                        <Route exact path={"/"} element={<IndexPage/>}></Route>
                        <Route exact path={"/tables"} element={<TablePage/>}></Route>
                        <Route exact path={"/order"} element={<OrderPage/>}></Route>
                    </Routes>
                </Router>
            </div>
        </body>
    );
}

export default App;
