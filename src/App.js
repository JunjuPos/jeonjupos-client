import React, {useState} from "react";
import IndexPage from "./pages/IndexPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TablePage from "./pages/TablePage";
import HeaderComponent from "./components/HeaderComponent";
import OrderPage from "./pages/OrderPage";
import "./css/main.css"
import {MyContext} from "./contexts/MyContext";

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
                    </Routes>
                </Router>
            </div>
        </MyContext.Provider>
    );
}

export default App;
