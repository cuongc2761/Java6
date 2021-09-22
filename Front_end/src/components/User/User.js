import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

function User(){

    const columns = [
        { id: 'username', label: 'User Name', minWidth: 50 },
        { id: 'fullName', label: 'Full Name', minWidth: 100 },
        {
          id: 'email',
          label: 'Email',
          minWidth: 170,
          align: 'right',
        },
        
    ];

    const [messageUser, setMessageUser] = useState("False");
    const [statusUser, setStatusUser]= useState(false); 
      
    const [rows, setRows] = useState([{username:"1",password:"1",fullName:"1",email:"1",photo:"1"}]);
    const url = 'http://localhost:8080/shop/admin/account';
    useEffect(()=>{
      axios.get(url)
      .then(respose =>{
          const {data} = respose;
          setRows(data);
      })
      .catch(error => console.log(error))
    },[statusUser]);
    
    const useStyles = makeStyles({
        root: {
        width: '100%',
        },
        container: {
        maxHeight: 440,
        },
    });

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    var myCollapsible = document.getElementById('collapseExampleUser')
  if(myCollapsible != null){
    myCollapsible.addEventListener('show.bs.collapse', function () {
      setTimeout(() => {
        myCollapsible.setAttribute("class","collapse hide")
      }, 3000);
    })
  }

  const [rowOrder, setRowOrder] = useState([{id:"",createDate:'',address:''}]);
  const [rowOrderDetail, setRowOrderDetail] = useState([{id:"",product:{id:'',name:''},price:'',quantity:''}]);
  const useStyles3 = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  return (
    <Paper className={classes.root}>
        <div class="mt-2 collapse fade" id="collapseExampleUser">
          <Alert severity={messageUser=="True"?"success":"error"}>{messageUser=="True"?"Xóa thành công":"Xóa thất bại"}</Alert>
        </div>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                <TableCell>
                    Action
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.username}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                        );
                    })}
                    <TableCell class='row'>
                    <div class="mr-3 col-1"/>
                    <div class="mr-3 col-3">
                          <button class="btn btn-primary" type="button" aria-haspopup="true" aria-expanded="false">
                              <Link to={'/admin/user/updateUser/'+row.username} style={{textDecoration: 'none', color:'white'}}>
                                  Detail
                              </Link>
                          </button>
                        </div>
                        <div class="mr-3 col-3">
                          <button class='ml-3'
                              onClick = { ()=>
                                  axios.delete(url+'/delete/'+row.username)
                                  .then(() =>{
                                      setMessageUser("True");
                                      setStatusUser(!statusUser);
                                  })
                                  .catch(error => {
                                      console.log(error);
                                      setMessageUser("False");
                                  })
                              } 
                              class="btn btn-danger" type="button" 
                              data-bs-toggle="collapse" data-bs-target="#collapseExampleUser" aria-expanded="false" aria-controls="collapseExampleCategory"
                          >
                              Delete
                          </button>
                        </div>
                        <div class="mr-3 col-5">
                            <button type="button" class="btn btn-primary ml-3" data-bs-toggle="modal" data-bs-target="#OrderModal" 
                                onClick={()=>
                                {
                                    axios.get(url+'/getOrder/'+row.username)
                                    .then(rep=>{
                                        const {data} = rep;
                                        setRowOrder(data)
                                    })
                                    .catch(error => {console.log(error);})
                                }
                                }
                            >
                                All Order
                            </button>
                        </div>
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            <div class="modal fade" id="OrderModal" tabIndex="-1" role='dialog' aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
                <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Order Detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">CreateDate</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">All Product</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rowOrder.map((rowOD) => (
                                <TableRow key={rowOD.name}>
                                <TableCell component="th" scope="rowOD">
                                    {rowOD.id}
                                </TableCell>
                                <TableCell align="right">{rowOD.createDate}</TableCell>
                                <TableCell align="right">{rowOD.address}</TableCell>
                                <TableCell align="right">
                                <button type="button" class="btn btn-primary ml-3" data-bs-toggle="modal" data-bs-target="#OrderDetailModal" 
                                    onClick={()=>
                                    {
                                        axios.get(url+'/getOrderDetail/'+rowOD.id)
                                        .then(rep=>{
                                            const {data} = rep;
                                            console.log(data);
                                            setRowOrderDetail(data)
                                        })
                                        .catch(error => {console.log(error);})
                                    }
                                    }
                                >
                                    All products
                                </button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>

            </div>
            <div class="modal fade" id="OrderDetailModal" tabIndex="-1" role='dialog' aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
                <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rowOrderDetail.map((rowDT) => (
                                <TableRow key={rowDT.name}>
                                <TableCell component="th" scope="rowDT">
                                    {rowDT.id}
                                </TableCell>
                                <TableCell align="right">{rowDT.product.id} - {rowDT.product.name}</TableCell>
                                <TableCell align="right">{rowDT.price}</TableCell>
                                <TableCell align="right">
                                    {rowDT.quantity}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>

            </div>
            </Table>
        </TableContainer>

        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
        
    );
}

export default User;