import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React from 'react'

function FormProduct(props){

    const url = 'http://localhost:8080/shop/admin/product';
    
    const btnSaveClick = function(){
        axios.post(url+'/add',props.product)
        .then(res =>{
            const {data} = res;
            props.setProduct(data)
        })
        .catch(error => console.log(error))
    }

    const join = function (t, a, s) {
        Date.parse(t);
        let t1 = new Date(t);
        function format(m) {
           let f = new Intl.DateTimeFormat('en', m);
           return f.format(t1);
        }
        return a.map(format).join(s);
      }
    
    const formatDate = function(s){
        let a = [{day: 'numeric'}, {month: 'numeric'}, {year: 'numeric'}];
        return join(s,a,'-');
    }

    return(
        <form >
            <div class='row' align='center'>
                <h2 >Create Product</h2>
            </div>
            <div class="mb-3">
                <label for="exampleInput1" class="form-label">Id</label>
                <input type="text" class="form-control" id="exampleInput1" name='id' value = {props.product.id} readOnly ></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput1" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleInput1" name='name' value = {props.product.name} onChange={props.tfOnChangeHandle} ></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput2" class="form-label">Image</label>
                <input type="text" class="form-control" id="exampleInput2" name='image' value = {props.product.image} onChange={props.tfOnChangeHandle}></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput3" class="form-label">Price</label>
                <input type="text" class="form-control" id="exampleInput3" name='price' value = {props.product.price} onChange={props.tfOnChangeHandle}></input>
            </div>
            <div class="mb-3">
                <label for="exampleInput4" class="form-label">Date</label>
                <input type="text" class="form-control" id="exampleInput4" name='date' value = {props.product.date} onChange={props.tfOnChangeHandle}></input>
            </div>

            <label class='mb-3'>Available</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="available" id="available1" value='true' checked={ props.product.available+"" == "true"?true:false} onChange={props.tfOnChangeHandle}></input>
                <label class="form-check-label" for="available1"> True </label>
            </div>
            <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="available" id="available2" value='false' checked={ props.product.available+"" == "false"?true:false } onChange={props.tfOnChangeHandle}></input>
                <label class="form-check-label" for="available2"> False </label>
            </div>
            <Autocomplete
                inputValue={props.product.category.name}
                value = {props.product.category}
                onChange={(event,value)=>{
                    props.setProduct(product=>({
                            ...product,
                            category: value
                        })    
                    )
                }}
                id="combo-box-demo"
                name='category'
                options={props.categories}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                
            />
            <button onClick={btnSaveClick} type="button" class="btn btn-primary mt-3">Submit</button>
        </form>
    )
}

export default FormProduct;