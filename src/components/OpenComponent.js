import React, {useState, useEffect} from "react";

const Open = () => {

    const onOpenHandler = () => {

    }

    return (
        <div>
            <button
                id={"open-btn"}
                onClick={onOpenHandler}
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

export default Open;