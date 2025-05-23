import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
const Home =()=> {
    let navigate = useNavigate();
    return (
      <div>
        <Button type="primary" onClick={()=> navigate('/about') }>前往about</Button>

        <div className="box2"></div>
      </div>
    )
}

export default Home