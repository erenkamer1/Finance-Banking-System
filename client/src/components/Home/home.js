import React from "react";
import { useNavigate } from "react-router-dom";


const Home = (props) => {
    const navigate= useNavigate()



    return (
        <div>
            <h1>Home</h1>
            <h1 onClick={() => alert(props.isLoggedIn)}>User: {props.user.email}</h1>
            <h3 onClick={() => navigate('/home/personal-list')}>Personal List</h3>
            <h3 onClick={() => navigate('/home/customer-definition')}>Customer Definition</h3>
            <h3 onClick={() => navigate('/home/provision')}>Money Order Provision</h3>
            <h3 onClick={() => navigate('/home/fund-definition')}>Fund Definition</h3>
            <h3 onClick={() => navigate('/home/fund-price')}>Fund Price Screen</h3>
            <h3 onClick={() => navigate('/home/trade')}>Fund Trading</h3>
            <button onClick={props.logout}>Log out</button>
        </div>
    );
};

export default Home;