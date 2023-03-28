import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../css/Login.css";
import {
    login, jwtLogin
} from "../connection/index";
// import {MyContext} from "../contexts/MyContext";

const Login = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const tableNavigate = () => {
        navigate("/tables");
    }

    useEffect(() => {
        if (localStorage.getItem('openyn') === "false") {
            if (localStorage.getItem("jwt") !== null) {
                jwtLoginHandler();
            } else {
            }
        } else {
            jwtLoginHandler();
        }
    }, [])

    const jwtLoginHandler = async () => {
        try{
            const result = await jwtLogin();
            console.log("result : ", result);
            if (result.data.res_code === "0000") {
                localStorage.setItem("storename", result.data.data.storename);
                // storeid
                localStorage.setItem("storeid", result.data.data.storeid);
                // jwt
                localStorage.setItem("jwt", result.data.data.jwt);

                localStorage.setItem("openyn", "true"); // 로그인 성공 시 openyn = true 로 변경
                tableNavigate();
            } else {
                alert(result.data.message);
            }
        } catch (err) {
            alert("다시 로그인해주세요.")
        }
    }

    const loginBtnHandler = async () => {
        const data = {
            id: id,
            password: password
        }
        const result = await login(data);
        if (result.status === 200) {
            if (result.data.result === true) {
                // 로그인 성공 시 localStorage setting
                // setStorename(result.data.data.storename);    // context
                localStorage.setItem("storename", result.data.data.storename);
                // storeid
                localStorage.setItem("storeid", result.data.data.storepkey);
                // jwt
                localStorage.setItem("jwt", result.data.data.jwt);

                localStorage.setItem("openyn", "true"); // 로그인 성공 시 openyn = true 로 변경
                tableNavigate();
            } else {
                alert(result.data.message)
            }
        } else {
            alert("api 통신오류[" + result.status + "]")
        }
    }

    const idHandler = (e) => {
        setId(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className={"login-container"}>
            <div className={"login-title"}>JeonJu POS</div>
            <div>
                <input type={"text"} className={"id-input"} placeholder={"USER ID"} onChange={(e) => {idHandler(e)}}></input>
            </div>
            <div>
                <input type={"password"} className={"password-input"} placeholder={"PASSWORD"} onChange={(e) => {passwordHandler(e)}}></input>
            </div>
            <button id={"login-btn"} onClick={loginBtnHandler}>LOGIN</button>
        </div>
    )
}

export default Login;