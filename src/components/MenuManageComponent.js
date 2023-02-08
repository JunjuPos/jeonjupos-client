import React, {useState, useEffect, useContext} from "react";
import "../css/menuManageComponent.css"
import {
    getManageMenuList,
    menuUseYnModify,
    takeoutYnModify,
    takeinYnModify
} from "../api/axiosClient";
import {MyContext} from "../contexts/MyContext";
import {useNavigate} from "react-router-dom";

const MenuManageComponent = (props) => {
    const {manageMenuCategoryPkey, setManageMenuCategoryPkey} = useContext(MyContext);  // 현재 클릭한 카테고리 pkey 저장
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState([]);
    const [categoryMenuList, setCategoryMenuList] = useState([]);
    const [allMenuList, setAllMenuList] = useState([]);

    useEffect(() => {
        setManageMenuCategoryPkey(0);
        getMenuList();
    }, []);

    const getMenuList = async () => {
        try {
            const result = await getManageMenuList();
            setCategoryList(result.data.data.categorylist);
            if (manageMenuCategoryPkey !== 0) {
                const menulist = result.data.data.menulist.map((item) => {
                    if (item.categorypkey === manageMenuCategoryPkey) {
                        return item;
                    }
                }).filter(element => element)
                setCategoryMenuList([...menulist]);
                setAllMenuList(result.data.data.menulist);
            } else {
                const menulist = result.data.data.menulist.map((item) => {
                    if (item.categorypkey === result.data.data.categorylist[0].categorypkey) {
                        return item;
                    }
                }).filter(element => element)
                setCategoryMenuList([...menulist]);
                setAllMenuList(result.data.data.menulist);
            }
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    const categoryOnClickHandler = (e) => {
        setManageMenuCategoryPkey(parseInt(e.currentTarget.id));
        const menulist = allMenuList.map((item) => {
            if (parseInt(e.currentTarget.id) === item.categorypkey) {
                return item;
            }
        }).filter(element => element);
        setCategoryMenuList([...menulist]);
    }

    const menuUseYnOnClickHandler = async (e) => {
        //  메뉴 할인여부 상태 변경
        try{
            await menuUseYnModify({menupkey: e.currentTarget.id});
            await getMenuList();
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    const takeoutYnOnClickHandler = async (e) => {
        //  메뉴 포장 여부 변경
        try{
            await takeoutYnModify({menupkey: e.currentTarget.id});
            await getMenuList();
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const takeinYnOnClickHandler = async (e) => {
        //  메뉴 포장 여부 변경
        try{
            await takeinYnModify({menupkey: e.currentTarget.id});
            await getMenuList();
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <div className={"menu-manage-container"}>
            <div className={"menucategory-list-container"}>
                {
                    categoryList.map((item) => {
                        return (
                            <button id={item.categorypkey} onClick={(e) => {categoryOnClickHandler(e)}}>
                                {item.categoryname}
                            </button>
                        )
                    })
                }
            </div>
            <table className={"menu-list-container"}>
                <tr className={"menu-title"}>
                    <th className={"name"}>메뉴명</th>
                    <th className={"amount"}>정상가</th>
                    <th className={"amount"}>판매가</th>
                    <th className={"checkbox"}>할인여부</th>
                    <th className={"amount"}>할인율</th>
                    <th className={"checkbox"}>판매여부</th>
                    <th className={"checkbox"}>포장가능여부</th>
                    <th className={"checkbox"}>매장식사가능여부</th>
                </tr>
                {
                    categoryMenuList.map((item) => {
                        return (
                            <tr className={"menu-card"}>
                                <td>{item.menuname}</td>
                                <td>{item.originprice.toLocaleString()}</td>
                                <td>{item.saleprice.toLocaleString()}</td>
                                <td><input type={"checkbox"} id={item.menupkey} name={""} disabled checked={item.discountyn}/></td>
                                <td>{item.discountrate}</td>
                                <td><input type={"checkbox"} id={item.menupkey} name={""} checked={item.useyn} onClick={(e) => {menuUseYnOnClickHandler(e)}}/></td>
                                <td><input type={"checkbox"} id={item.menupkey} name={""} checked={item.takeoutyn} onClick={(e) => {takeoutYnOnClickHandler(e)}}/></td>
                                <td><input type={"checkbox"} id={item.menupkey} name={""} checked={item.takeinyn} onClick={(e) => {takeinYnOnClickHandler(e)}}/></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default MenuManageComponent;