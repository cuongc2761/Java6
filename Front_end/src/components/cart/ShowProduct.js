import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';
import { data } from 'jquery';
import { TableHead } from '@material-ui/core';

function ShowProduct(){

    const [rows, setRows] = useState([{"id":'',"name":"",'image':'','price':'','date':'','available':'','category':''}])
    const url = 'http://localhost:8080/shop/admin/product/getByAvailable' 
    useEffect(()=>{
        axios.get(url)
            .then(res=>{
                const {data}= res;
                setRows(data);
            })
            .catch(error=>{console.log(error);})  
            
    },[])
    
    const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    }));

    function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <div className={classes.root}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
      };

      const useStyles2 = makeStyles({
        table: {
          minWidth: 500,
        },
      });
      const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [listProduct, setListProduct] = useState([])

  const productAdd = function(id, idProduct, name, price, quantity){
      return {"id":id,"name":name,'price':price,'quantity':quantity}
  }

    // const addOnClick = function(event, value, index){
    //     setOrder(oldState=>{
    //       const list = oldState.map(function(val){
    //         const amo = val.amount+1;
    //         return val.id == value.id ? {...val,amount: amo} : val
    //       })
    //       return list
    //     })
    //   }

    const [address, setAddress] = useState();

    const tfAndressOnChange = function(event){
        setAddress(event.target.value)
    }

  return (
    <div>
        <div class="d-flex justify-content-end mt-3"> 
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Cart
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listProduct.map(row=>{
                                    return (
                                        <TableRow id={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>
                                                <button class="btn btn-primary p-2"
                                                    onClick={()=>{
                                                        setListProduct(()=>{
                                                            let list = listProduct;
                                                            list = listProduct.map(
                                                                (product)=>{
                                                                    const amo = product.quantity*1 - 1;
                                                                    return row.id == product.id ? {...product,quantity:amo} : product;
                                                                }
                                                            )
                                                            for(let i = 0;i<list.length;i++){
                                                                if(list[i].quantity*1 == 0){
                                                                    list.splice(i, 1);
                                                                }
                                                            }
                                                            return list;
                                                        })
                                                    }}
                                                >
                                                    -
                                                </button>  
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary ml-3" data-bs-toggle="modal" data-bs-target="#BuyModal" disabled={listProduct.length==0?true:false}

                    >Buy</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="BuyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Address</label>
                        <input type="text" class="form-control" id="recipient-name" 
                            onChange={tfAndressOnChange}
                        ></input>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"
                        onClick={()=>{
                            const order = {id:'', account:localStorage.getItem("Account"), address:address, listOrderDetail:listProduct}
                            axios.post('http://localhost:8080/shop/user/buy',order)
                                .then(res=>{
                                    const {data} = res;
                                    console.log(res);
                                })
                                .catch(error=>console.log(error))
                        }}
                    >Send</button>
                </div>
                </div>
            </div>
            </div>

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableBody class="row mt-3">
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <div class="card col-3 p-2 mt-3 mb-3" id={row.id}>
                        <img class="card-img-top" src={row.image} alt="Card image cap" style={{minHeight: "260px"}}></img>
                        <div class="card-body">
                            <h5 class="card-title">{row.name}</h5>
                            <p class="card-text">Price: {row.price}</p>
                            <a href="#" class="btn btn-primary" 
                                onClick={()=>{
                                    let pro = productAdd(row.id, row.id , row.name, row.price, 1);
                                    setListProduct((oldState)=>{
                                        let list = listProduct;
                                        let check = true;
                                        for(let i = 0;i<listProduct.length;i++){
                                            if(listProduct[i].id == row.id){
                                                check = false;
                                                break;
                                            }
                                        }

                                        if(check){
                                            list = [...listProduct,pro];
                                            return list;
                                        }
                                        
                                        list = listProduct.map(
                                            (product)=>{
                                                const amo = product.quantity*1+1;
                                                return row.id == product.id ? {...product,quantity:amo} : product;
                                            }
                                        )
                                        return list.length == 0 ? [pro]:list;  
                                    })
                                }} 
                            >Add to cart</a>
                        </div>
                    </div>
                ))}

                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[8, 12, 16, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
            </TableContainer>
    </div>
  );
}

export default ShowProduct;