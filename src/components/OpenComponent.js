import React from "react";
import {useNavigate} from "react-router-dom";

const OpenComponent = () => {

    const navigate = useNavigate();

    const tableNavigate = () => {
        navigate("/tables");
    }

    return (
        <div>
            <button
                id={"open-btn"}
                onClick={tableNavigate}
                style={{
                    marginLeft: '40%',
                    marginTop: '250px',
                    width: '20%',
                    height: '100px'
                }}
            >
                오픈
            </button>
        </div>
    )
}

export default OpenComponent;