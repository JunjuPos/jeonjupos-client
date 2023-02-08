import React, {useState, useEffect} from "react";
import "../css/menuManageComponent.css"
import {
    getManageMenuList,
    menuUseYnModify,
    takeoutYnModify,
    takeinYnModify
} from "../api/axiosClient";

const MenuManageComponent = (props) => {

    const [categoryList, setCategoryList] = useState([]);
    const [categoryMenuList, setCategoryMenuList] = useState([]);
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        getMenuList();
    }, []);

    const getMenuList = async () => {
        try {
            const result = await getManageMenuList();
            setCategoryList(result.data.data.categorylist);
            const menulist = result.data.data.menulist.map((item) => {
                // console.log(item);
                if (item.categorypkey === result.data.data.categorylist[0].categorypkey) {
                    return item;
                }
            }).filter(element => element)
            setCategoryMenuList([...menulist]);
            setMenuList(result.data.data.menulist);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const categoryOnClickHandler = (e) => {
        const menulist = menuList.map((item) => {
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
                            <p id={item.categorypkey} onClick={(e) => {categoryOnClickHandler(e)}}>
                                {item.categoryname}
                            </p>
                        )
                    })
                }
            </div>
            <table className={"menu-list-container"}>
                <tr className={"menu-list-title"}>
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
                            <tr>
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