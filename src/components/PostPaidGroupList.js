import React, {useEffect, useState} from "react";
import {
    getPostPaidGroupList
} from "../connection/index";
import "../css/postPaidGroup.css"
import {useNavigate} from "react-router-dom";

const PostPaidGroupList = (props) => {
    const navigate = useNavigate();
    const [postPaidList, setPostPaidList] = useState([]);
    const [search, setSearch] = useState("");

    const getPostPiadGroupList = async () => {
        try{
            const result = await getPostPaidGroupList(search);
            setPostPaidList(result.data.postpaidgrouplist);
        } catch (err) {
            alert(err.response.data.message);
            if (err.response.status === 401) {
                navigate("/");
            }
        }
    }

    useEffect(() => {
        getPostPiadGroupList();
    }, [])

    return (
        <div className={"postpaidgroup-container"}>
            <div className={"search-container"}>
                <input className={"search"} type={"text"} placeholder={"(업체명, 부서명, 대표명, 전화번호)로 검색해주세요"} onChange={(e) => {setSearch(e.currentTarget.value)}}/>
                <button className={"search-submit-btn"} onClick={(e) => {getPostPiadGroupList()}}>검색</button>
            </div>
            <table className={"postpaidgroup-table"}>
                <tr className={"postpaidgroup-table-title-row"}>
                    <th>업체명</th>
                    <th>부서명</th>
                    <th>대표명</th>
                    <th>전화번호</th>
                </tr>
                {
                    postPaidList.map((item) => {
                        return (
                            <tr className={"postpaidgroup-table-row"}>
                                <td className={"companyname"}>{item.companyname}</td>
                                <td className={"departmentname"}>{item.departmentname}</td>
                                <td className={"delegatename"}>{item.delegatename}</td>
                                <td className={"phone"}>{item.phone}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default PostPaidGroupList;