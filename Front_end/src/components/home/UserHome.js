import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShowProduct from '../cart/ShowProduct';
import { Route, Switch } from 'react-router-dom';
import Header from '../layout/Header';
import UserMenu from '../layout/UserMenu';

function UserHome(){

    

    return(
        <div class='container'>
            <Header/>
            <UserMenu/>
            <ShowProduct/>
        </div>
    )
}

export default UserHome;