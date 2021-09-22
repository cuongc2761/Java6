import axios from 'axios';
import React, { useState } from 'react'

function FormUser(props){

    const url = 'http://localhost:8080/shop/admin/account';
    const urlRole = 'http://localhost:8080/shop/admin/roleUser';
    const urlUpdateAuthority = 'http://localhost:8080/shop/admin/authority'
    const [authority, setAuthority] = useState();

    const btnSaveClick= function(){
        
        axios.post(url+"/add", props.user)
            .then(respose => {
                const {data} = respose;
                props.setUser(data);
            })
            .catch(error => console.log(error))

        axios.post(urlUpdateAuthority+"/add/"+props.user.username, props.roleUser)
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
                <h2 >Create User</h2>
            </div>
            <div class="mb-3">
                <label for="exampleInput1" class="form-label">User Name</label>
                <input type="text" class="form-control" id="exampleInput1" name='username' value = {props.user.username} onChange={props.tfUserOnChangeHandle}></input>
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
            <button onClick={btnSaveClick} type="button" class="btn btn-primary mt-3">Submit</button>
        </form>
    )
}
export default FormUser;