import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import React from 'react'

function FormCategory(props){

    const url = 'http://localhost:8080/shop/admin/category';
    const btnSaveClick = function(){
        props.category.id="";
        axios.post(url+'/add',props.category)
        .then(res =>{
            const {data} = res;
            props.setCategory(data)
        })
        .catch(error => console.log(error))
    }

    return(
        <div class='container'>
            <form class='mt-3'>
                <div class='row' align='center'>
                    <h2 >Update Category</h2>
                </div>
                <div class="mb-3 mt-3">
                    <label for="exampleInput1" class="form-label">ID</label>
                    <input type="text" class="form-control" id="exampleInput1" name='id' value = {props.category.id} readOnly ></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="exampleInput1" name='name' value = {props.category.name} onChange={props.tfCategoryOnChangeHandle} ></input>
                </div>
                <div class='row'>
                    <div class='d-flex justify-content-center'>
                        <button onClick={btnSaveClick} type="button" class="btn btn-primary mt-3">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default FormCategory;