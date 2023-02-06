import axios from "axios";

const axiosClient = axios.create({
        // baseURL: 'http://52.78.45.79',
        baseURL: 'http://127.0.0.1:8000',
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

export const reOrder = async (data) => {
    return await axiosClient.post(
        "/order/re",
        {
            orderinfopkey: data.orderinfopkey,
            orderList: data.orderList,
            newOrderList: data.newOrderList
        },
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

// module.exports = getAPI;
