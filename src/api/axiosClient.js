import axios from "axios";

const axiosClient = axios.create({
    // baseURL: 'http://52.78.45.79',
    baseURL: 'http://api.jeonjupos.kr/api',
    // baseURL: 'http://127.0.0.1:8000',
    timeout: 10000
})

export const order = async (data) => {
    return await axiosClient.post(
        "/order",
        data,
        {
            headers: {
                jwt: `${localStorage.getItem("jwt")}`
            }
        }
    );
}

export const getOrderList = async (state) => {
    return await axiosClient.get(
        "/space/order/list?spacepkey=" + state,
        {
            headers: {
                jwt: `${localStorage.getItem("jwt")}`
            }
        }
    );
}

export const getOwner = async (data) => {
    return await axiosClient.post("/user/login", data);
}

export const orderModify = async (data) => {
    return await axiosClient.post(
        '/order/modify',
        data,
        {
            headers: {
                jwt: `${localStorage.getItem("jwt")}`
            }
        }
    );
}

export const getMenuList = async () => {
    return await axiosClient.get(
        "/menu/list",
        {
            headers: {
                jwt: `${localStorage.getItem("jwt")}`
            }
        }
    );
}

export const getTableList = async () => {
    return await axiosClient.get(
        "/space/list",
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

export const pay = async (data) => {
    return await axiosClient.post(
        "/payment",
        data,
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

export const getManageMenuList = async () => {
    return await axiosClient.get(
        "/manage/menu/list",
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

export const menuUseYnModify = async (data) => {
    return await axiosClient.post(
        "/manage/menu/useyn/modify",
        data,
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

export const takeoutYnModify = async (data) => {
    return await axiosClient.post(
        "/manage/menu/takeoutyn/modify",
        data,
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

export const takeinYnModify = async (data) => {
    return await axiosClient.post(
        "/manage/menu/takeinyn/modify",
        data,
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

export const getSaleList = async (startDate, endDate, searchPostPaidName, searchMenuName) => {
    return await axiosClient.get(
        `/manage/sale/list?startDate=${startDate}&endDate=${endDate}&postPaidName=${searchPostPaidName}&menuName=${searchMenuName}`,
        {headers: {jwt: `${localStorage.getItem("jwt")}`}}
    );
}

