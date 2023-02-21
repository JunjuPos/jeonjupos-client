import React, {useEffect, useState} from "react";
import "../css/menuDetail.css";
import {getMenu, menuModify} from "../connection/index";

const MenuDetail = (props) => {

    const [menupkey] = useState(props.menupkey);
    const [menu, setMenu] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const getMenuCall = async () => {
        const result = await getMenu(localStorage.getItem("storeid"), menupkey)
        setMenu(result.data.menu);
    }

    useEffect(() => {
        //  메뉴 상세조회
        setTimeout( () => {getMenuCall();}, 1000);
    }, [])

    const menuModifyClick = () => {
        setDisabled(!disabled);
        if (!disabled) {
            menuModify(menu);
        }
    }

    const menuNameOnChange = (e) => {
        setMenu({...menu, menuname: e.target.value});
    }

    const originPriceOnChange = (e) => {
        if (e.target.value.toString().length > 0) {
            setMenu({...menu, originprice: parseInt(e.target.value.split(",").join(""))});
        } else {
            setMenu({...menu, originprice: 0});
        }
    }

    const takeOutPriceOnChange = (e) => {
        if (e.target.value.toString().length > 0) {
            setMenu({...menu, takeoutprice: parseInt(e.target.value.split(",").join(""))});
        } else {
            setMenu({...menu, takeoutprice: 0});
        }
    }

    const ynUseOnChange = (e) => {
        setMenu({...menu, useyn: e.target.checked});
    }

    const takeInOnChange = (e) => {
        setMenu({...menu, takeinyn: e.target.checked});
    }

    const takeOutOnChange = (e) => {
        setMenu({...menu, takeoutyn: e.target.checked});
    }

    if (menu === null) {
        return (
            <div>잠시만 기달려주세요.</div>
        )
    } else {
        return (
            <div className={"menuDetail-container"}>
                <span>메뉴명 : </span><input type={"text"} value={menu.menuname} disabled={disabled} onChange={(e) => {menuNameOnChange(e)}}/>
                <br/>
                <span>카테고리 : </span><input type={"text"} value={menu.categoryname} disabled={true}/>
                <br/>
                <span>정상가 : </span><input value={menu.originprice.toLocaleString()} disabled={disabled} onChange={(e) => {originPriceOnChange(e)}}/>
                <br/>
                <span>할인여부 : </span><input type={"checkbox"} checked={menu.discountyn} disabled={true}/>
                <br/>
                <span>할인율 : </span><input type={"text"} value={menu.discountrate} disabled={true}/>
                <br/>
                <span>판매가 : </span><input type={"text"} value={menu.saleprice.toLocaleString()} disabled={true}/>
                <br/>
                <span>재고 : </span><input type={"text"} value={menu.stock.toLocaleString()} disabled={true}/>
                <br/>
                <span>판매상태 : </span><input type={"checkbox"} checked={menu.useyn} disabled={disabled} onChange={(e) => {ynUseOnChange(e)}}/>
                <br/>
                <span>포장가능여부</span><input type={"checkbox"} checked={menu.takeoutyn} disabled={disabled} onChange={(e) => {takeOutOnChange(e)}}/>
                <br/>
                <span>매장식사 가능여부</span><input type={"checkbox"} checked={menu.takeinyn} disabled={disabled} onChange={(e) => {takeInOnChange(e)}}/>
                <br/>
                <span>포장비용</span><input value={menu.takeoutprice.toLocaleString()} disabled={disabled} onChange={(e) => {takeOutPriceOnChange(e)}}/>
                <br/>
                <button onClick={menuModifyClick}>{disabled? "수정하기": "완료"}</button>
            </div>
        )
    }
}

export default MenuDetail;