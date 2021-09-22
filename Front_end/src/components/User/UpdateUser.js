import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function UpdateUser(props){

    let {id} = useParams();
    const url = 'http://localhost:8080/shop/admin/account';
    const urlRole = 'http://localhost:8080/shop/admin/roleUser';
    const urlUpdateAuthority = 'http://localhost:8080/shop/admin/authority'
    const [authority, setAuthority] = useState();

    useEffect(()=>{
        axios.get(url+"/"+id)
            .then(respose => {
                const {data} = respose;
                props.setUser(data);
                
            })
            .catch(error => console.log(error))
         
        axios.get(urlUpdateAuthority+"/"+id)
        .then(respose => {
            const {data} = respose;
            setAuthority(data);
            
        })
        .catch(error => console.log(error))
        
    },[]);

    useEffect(()=>{
        axios.get(urlRole+"/"+id)
            .then(respose => {
                const {data} = respose;
                props.setRoleUser(data);
            })
            .catch(error => console.log(error))
        }    
    ,[]);

    const btnUpdateClick = function(){
        axios.put(url+"/update/"+id, props.user)
            .then(respose => {
                const {data} = respose;
                console.log(data);
                props.setUser(data);
            })
            .catch(error => console.log(error))

        axios.put(urlUpdateAuthority+"/update/"+authority.id, props.roleUser)
            .then(respose => {
                const {data} = respose;
                console.log(data);
                props.setRoleUser(data);
            })
            .catch(error => console.log(error))
    }

    

    return(
        <form >
            <div class='row' align='center'>
                <h2 >Update User</h2>
            </div>
            <div class="mb-3">
                <label for="exampleInput1" class="form-label">User Name</label>
                <input type="text" class="form-control" id="exampleInput1" name='username' value = {props.user.username} readOnly></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput1" class="form-label">Fullname</label>
                <input type="text" class="form-control" id="exampleInput1" name='fullName' value = {props.user.fullName} onChange={props.tfUserOnChangeHandle} ></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput2" class="form-label">Passwork</label>
                <input type="text" class="form-control" id="exampleInput2" name='password' value = {props.user.password} onChange={props.tfUserOnChangeHandle}></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput3" class="form-label">Email</label>
                <input type="text" class="form-control" id="exampleInput3" name='email' value = {props.user.email} onChange={props.tfUserOnChangeHandle}></input>
            </div>
            <label class='mb-3'>Role</label>
            <select name='id' class="form-select form-select-xl mb-3" aria-label=".form-select-lg example" onChange={props.cbbOnchange}>
                <option value="DIRE" selected={props.roleUser.id == "DIRE"?true:false}>Director</option>
                <option value="STAF" selected={props.roleUser.id == "STAF"?true:false}>Staff</option>
                <option value="CUST" selected={props.roleUser.id == "CUST"?true:false}>Customer</option>
            </select>
            <button onClick={btnUpdateClick} type="button" class="btn btn-primary mt-3">Update</button>
        </form>
    )
}
export default UpdateUser;