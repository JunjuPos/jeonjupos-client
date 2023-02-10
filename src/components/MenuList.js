import React, {useEffect, useState, useRef} from "react";
import {getMenuList} from "../connection/index";
import "../css/menuListComponent.css"

const MenuList = (props) => {

    const [menulist, setMenuList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryMenuList, setCategoryMenuList] = useState([]);
    const [clickCategory, setClickCategory] = useState(0);
    const categoryRef = useRef();

    useEffect(() => {
        getMenuListCall();
    }, [])
    const getMenuListCall = async () => {
        try{
            const menuListRes = await getMenuList();
            if (menuListRes.status === 200) {
                if (menuListRes.data.res_code === "0000") {
                    setCategoryList(menuListRes.data.categorylist);
                    setMenuList(menuListRes.data.categorymenulist[0].menulist);
                    setCategoryMenuList(menuListRes.data.categorymenulist);
                } else {
                    alert(menuListRes.data.message)
                }
            } else {
                alert("오류")
            }
        } catch (e) {
            alert("api 통신 실패")
        }
    }

    const categoryOnClick = (categorypkey) => {
        let getmenulist = categoryMenuList.find((item, idx) => {
            return item.categorypkey === categorypkey;
        })
        setMenuList(getmenulist.menulist);
        setClickCategory(categorypkey);
    }

    const menuOnClick = (menupkey, saleprice, menuname) => {
        props.menuOnClickHandler(menupkey, saleprice, menuname, 1);
    }

    return (
        <div className={"menuList-container"}>
            <div className={"menuList-title-area"}>
                {
                    categoryList.map((category) => {
                        return (
                            <p className={"menuList-title"} ref={categoryRef} onClick={(e) => {categoryOnClick(category.categorypkey)}}>
                                {category.categoryname}
                            </p>
                        )
                    })
                }
            </div>
            <div className={"menuList-card-area"}>
                {
                    menulist.map((menu, index) => {
                        return (
                            <div className={"menuList-card"} onClick={(e) => {menuOnClick(menu.menupkey, menu.saleprice, menu.menuname)}}>
                                <p>{menu.menuname}</p>
                                <p>{menu.saleprice.toLocaleString()}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MenuList;