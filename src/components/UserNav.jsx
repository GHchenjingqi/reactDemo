import React from "react";
import { Avatar } from "antd";
import  url from "../assets/react.svg";
const UserNav = () => { 

    return (
        <div className="login">
            <Avatar src={url} />
            <span>皱皱纸</span>
        </div>
    );
};

export default UserNav;