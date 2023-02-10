import axios from "axios";
import {
    URL_GET_MANAGE_MENU_LIST,
    URL_GET_MENU_LIST,
    URL_GET_SALE_LIST,
    URL_GET_TABLE_LIST,
    URL_GET_TABLE_ORDER_LIST,
    URL_POST_LOGIN,
    URL_POST_MENU_USE_YN_MODIFY,
    URL_POST_ORDER,
    URL_POST_PAY,
    URL_POST_TAKEIN_YN_MODIFY,
    URL_POST_TAKEOUT_YN_MODIFY,
    URL_GET_POSTPAID_GROUP_LIST,
    URL_POST_JWT_LOGIN
} from "./urls";

export const login = async (data) => {
    const url = `${URL_POST_LOGIN}`;
    return await axios({
        url,
        data: data,
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
}

export const jwtLogin = async () => {
    const url = `${URL_POST_JWT_LOGIN}`;
    return await axios({
        url,
        headers: {jwt: `${localStorage.getItem("jwt")}`},
        method: "POST"
    });
}

export const getTableList = async () => {
    return await axios({
        url: URL_GET_TABLE_LIST,
        headers: {jwt: `${localStorage.getItem("jwt")}`},
        method: "GET"
    })
}

export const getTableOrderList = async (state) => {
    return await axios({
        url: `${URL_GET_TABLE_ORDER_LIST}?spacepkey=${state}`,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "GET"
    });
}

export const getMenuList = async () => {
    return await axios({
        url: URL_GET_MENU_LIST,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "GET"
    });
}

export const order = async (data) => {
    return await axios({
        url: URL_POST_ORDER,
        data: data,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "POST"
    });
}

export const pay = async (data) => {
    return await axios({
        url: URL_POST_PAY,
        data: data,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "POST"
    });
}

export const getManageMenuList = async () => {
    return await axios({
        url: URL_GET_MANAGE_MENU_LIST,
        headers: {jwt: `${localStorage.getItem("jwt")}`},
        method: "GET"
    });
}

export const menuUseYnModify = async (data) => {
    return await axios({
        url: URL_POST_MENU_USE_YN_MODIFY,
        data: data,
        headers: {jwt: `${localStorage.getItem("jwt")}`},
        method: "POST"
    });
}

export const takeoutYnModify = async (data) => {
    return await axios({
        url: URL_POST_TAKEOUT_YN_MODIFY,
        data: data,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "POST"
    });
}

export const takeinYnModify = async (data) => {
    return await axios({
        url: URL_POST_TAKEIN_YN_MODIFY,
        data,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "POST"
    });
}

export const getSaleList = async (startDate, endDate, searchPostPaidName, searchMenuName) => {
    return await axios({
        url: `${URL_GET_SALE_LIST}?startDate=${startDate}&endDate=${endDate}&postPaidName=${searchPostPaidName}&menuName=${searchMenuName}`,
        headers: {jwt: `${localStorage.getItem("jwt")}`},
        method: "GET"
    });
}

export const getPostPaidGroupList = async (search) => {
    return await axios({
        url: `${URL_GET_POSTPAID_GROUP_LIST}?search=${search}`,
        headers: {
            jwt: `${localStorage.getItem("jwt")}`
        },
        method: "GET"
    })
}

