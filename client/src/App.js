import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import * as jose from "jose";
import { URL } from "./config.js";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Personal from "./components/Personal/personal_list.js";
import CustomerDefinition from "./components/Customer-definifition/customerDefinition.js";
import FundDefinition from "./components/Fund-definition/fundDefiniton.js";
import FundPrice from "./components/Fund-price/fundPrice.js";
import Provision from "./components/Provision/orderProvision.js";
import Trade from "./components/Trade/fundTrade.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/verify_token`);
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    let user = {
      email: decodedToken.userEmail,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
       <Routes>
        <Route path="/"  element={ isLoggedIn ? <Home logout={logout} user={user} isLoggedIn={isLoggedIn} /> : <Login login={login} /> }/>
        <Route
          path="/register"
          element={isLoggedIn ? <Home logout={logout} user={user} isLoggedIn={isLoggedIn} /> : <Register />}
        />
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/home"
          element={   <Home logout={logout} user={user} isLoggedIn={isLoggedIn} /> }
        />
       <Route path="/home/personal-list" element={<Personal isLoggedIn={isLoggedIn} user={user} />} /> 
       <Route path="/home/customer-definition" element={<CustomerDefinition isLoggedIn={isLoggedIn} user={user} />} />
       <Route path="/home/fund-definition" element={<FundDefinition isLoggedIn={isLoggedIn} user={user} />} />
       <Route path="/home/fund-price" element={<FundPrice isLoggedIn={isLoggedIn} user={user} />} />
       <Route path="/home/provision" element={<Provision isLoggedIn={isLoggedIn} user={user} />} />
       <Route path="/home/trade" element={<Trade isLoggedIn={isLoggedIn} user={user} />} />
        
      </Routes>
      
    </Router>
  );
}

export default App;
