import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Home from './components/Home'
import Login from './components/login/Login';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import UserHome from './components/home/UserHome'

function App() {
  
  const [account, setAccount]= useState({username:"",password:""})
  const [role, setRole] = useState({id:'', name:''});

  const tfOnchangehandleLogin = (event)=>{
      setAccount(({
          ...account,
          [event.target.name] : event.target.value
      }));
    }

    const urlLogin = "http://localhost:8080/shop/login/";
    const btnLogin = function(){
      console.log(account);
      axios.post(urlLogin, account)
        .then((res)=>{
          const {data} = res;
          console.log(data);
          setRole(data);
          localStorage.setItem("Role",data.id);
          localStorage.setItem("Account",account.username);
        })
        .catch((error)=>{
          console.log(error);
        })
        if(localStorage.getItem("Role")=='DIRE'||localStorage.getItem("Role")=='STAF'){
          window.location.replace("http://localhost:3000/admin")
        }else{
          if(localStorage.getItem("Role")=='CUST'){
            window.location.replace("http://localhost:3000/")
          }
        }
    }

  return (
    <div class = 'container'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
            <UserHome />
          </Route>
          <Route path="/admin" render={()=>{
              return localStorage.getItem('Role') == 'DIRE' || localStorage.getItem('Role') == 'STAF' ? <Home role={role} setRole={setRole} setAccount={setAccount} account={account}/> :  <Redirect to ="/login"/>
          }}>
          </Route>
          <Route exact path="/login">
            <Login btnLogin={btnLogin} account={account} tfOnchangehandleLogin={tfOnchangehandleLogin} setRole={setRole} role={role}/>
          </Route>  
        </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
