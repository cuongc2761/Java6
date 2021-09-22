import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';

function UpdateCategory(props){
   
    

    let {id} = useParams();
    const url = 'http://localhost:8080/shop/admin/category';

    useEffect(()=>{
        if(!isNaN(id)){
            axios.get(url+"/"+id)
            .then(respose => {
                const {data} = respose;
                props.setCategory(data);
            })
            .catch(error => console.log(error))
        }
    },({}))
    
    const btnUpdateCategoryClick = function(){
        
        axios.put(url+"/update/"+id, props.category)
            .then(respose => {
                const {data} = respose;
                props.setCategory(data);
            })
            .catch(error => console.log(error)
        )
        
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
                        <button onClick={btnUpdateCategoryClick} type="button" class="btn btn-primary mt-3">
                            <Link to="/admin/category/showall" style={{ textDecoration: 'none' , color: 'white'}}>
                                Submit
                            </Link>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default UpdateCategory;