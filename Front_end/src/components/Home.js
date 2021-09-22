import React, { useEffect, useState } from 'react'
import Header from './layout/Header';
import Menu from './layout/Menu';
import Product from './product/Product';
import UpdateProduct from './product/UpdateProduct';
import FormProduct from './product/FormProduct';
import Categories from './category/Categories';
import UpdateCategory from './category/UpdateCategory';
import FormCategory from './category/FormCategory';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import User from './User/User';
import UpdateUser from './User/UpdateUser';
import FormUser from './User/FormUser';
import ChartProduct from './chart/ChartProduct';


function Home(props){

  const accountId = localStorage.getItem("Account")
  const RoleId = localStorage.getItem("Role")
  console.log(RoleId);
  // //product

  let d = new Date();
  const [status, setStatus]= useState(false);
  const [product, setProduct] = useState({"id":'',"name":"",'image':'','price':'','date':'','available':'','category':''});
  const [categories, setCategories] = useState([{id:'',name:''}]);
  
  const urlCategories = 'http://localhost:8080/shop/admin/categories'
  useEffect(()=>{
    axios.get(urlCategories)
    .then(res =>{
      const {data} = res;
      setCategories(data);
    })
    .catch(error => console.log(error))
  },[])

  const tfProductOnChangeHandle = (event)=>{
    setProduct(({
        ...product,
        [event.target.name] : event.target.value
    }));
  }
 
  const [rows, setRows] = useState([{"id":'1',"name":"1",'image':'1','price':'1','date':"1",'available':'1','category':'1'}]);
  const url = 'http://localhost:8080/shop/admin/product';
  useEffect(()=>{
      axios.get(url)
      .then(respose =>{
          const {data} = respose;
          setRows(data);
      })
      .catch(error => console.log(error))
  },[]);

  //category
  const [category, setCategory] = useState({id:'',name:''})
  const [rowsProduct, setRowsProduct] = useState([{"id":'1',"name":"1",'image':'1','price':'1','date':"1",'available':'1','category':'1'}]);

  const tfCategoryOnChangeHandle = (event)=>{
    setCategory(({
        ...category,
        [event.target.name] : event.target.value
    }));
  }

  //user
  const [user, setUser] = useState({username:'',password:''})
  const [roleUser, setRoleUser] = useState({id:'',name:''})

  const tfUserOnChangeHandle = (event)=>{
    setUser(({
        ...user,
        [event.target.name] : event.target.value
    }));
  }

  const cbbOnchange = (event)=>{
    setRoleUser({id:event.target.value}) 
  }

  const [name, setName] = useState('');
  const btnSearchOnclick = function(){
    axios.get(url+"/search/"+name)
      .then(res=>{
        const {data} = res;
        setRows(data)

      })
      .catch(error=>console.log(error))
  }
  
  const tfSearchOnchage = function(event){
    setName(event.target.value);
  }
  

  return (
    <div class = 'container'>
          <Header/>
          <Menu/>
          <Switch>
            <Route exact path="/admin/user/showall" render={()=>{
                return RoleId == 'DIRE'? <User role={props.role}/> : <Redirect to='/admin' />
            }}>
              
            </Route>
            <Route exact path="/admin/user/updateUser/:id" render={()=>{
                return RoleId == 'DIRE'? <UpdateUser cbbOnchange={cbbOnchange} user={user} setUser={setUser} roleUser={roleUser} setRoleUser={setRoleUser} tfUserOnChangeHandle={tfUserOnChangeHandle}/>: <Redirect to='/admin' />
            }}>
              
            </Route>
            <Route exact path="/admin/user/formUser" render={()=>{
                return RoleId == 'DIRE'? <FormUser cbbOnchange={cbbOnchange} user={user} setUser={setUser} roleUser={roleUser} setRoleUser={setRoleUser} tfUserOnChangeHandle={tfUserOnChangeHandle}/> : <Redirect to='/admin' />
            }}>
              
            </Route>

            <Route exact path="/admin/chart" render={()=>{
                return RoleId == 'DIRE'? <ChartProduct/> : <Redirect to='/admin' />
            }}>
              
            </Route>

            <Route exact path="/admin/category/showall">
              <Categories setCategory={setCategory} setRowsProduct={setRowsProduct} status={status} setStatus={setStatus} rows={rowsProduct} />
            </Route>
            <Route exact path="/admin/category/updateCategory/:id" >
              <UpdateCategory tfCategoryOnChangeHandle={tfCategoryOnChangeHandle} category={category} setCategory={setCategory} />
            </Route>
            <Route exact path="/admin/category/formCategory" >
              <FormCategory tfCategoryOnChangeHandle={tfCategoryOnChangeHandle} category={category} setCategory={setCategory} />
            </Route>

            <Route exact path="/admin/product/showall">
              <Product btnSearchOnclick={btnSearchOnclick} tfSearchOnchage={tfSearchOnchage} setName={setName} setRows={setRows} status={status} setStatus={setStatus} rows={rows}/>
            </Route>
            <Route exact path="/admin/product/updateProduct/:id">
              <UpdateProduct categories={categories} setCategories={setCategories} tfOnChangeHandle={tfProductOnChangeHandle} product={product} setProduct={setProduct} />
            </Route>
            <Route exact path="/admin/product/formProduct">
              <FormProduct   categories={categories} setCategories={setCategories} tfOnChangeHandle={tfProductOnChangeHandle} product={product} setProduct={setProduct} />
            </Route>
          </Switch>
    </div>
  );
  
}
export default Home;