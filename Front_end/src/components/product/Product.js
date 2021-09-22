import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DetailProduct from './UpdateProduct';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import { Collapse } from '@material-ui/core';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Alert } from '@material-ui/lab';

import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function Product(props){  

    const [message, setMessage] = useState("False");
    const url = 'http://localhost:8080/shop/admin/product';

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
      
      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
      const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'available', numeric: false, disablePadding: false, label: 'Available' },
      ];
 
      const useToolbarStyles = makeStyles((theme) => ({
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
        },
        highlight:
          theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
              },
        title: {
          flex: '1 1 100%',
        },
      }));
      
      const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected } = props;
      
        return (
          <Toolbar
            className={clsx(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
          >
            {numSelected > 0 ? (
              <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Danh sách sản phẩm
              </Typography>
            )}
      
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        );
      };
      
      EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
      };
      
      const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        },
        paper: {
          width: '100%',
          marginBottom: theme.spacing(2),
        },
        table: {
          minWidth: 750,
        },
        visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
        },
      }));

      const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  

  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='left'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell >
                    Action
            </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

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
    let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
      if(s!=null){
        return join(s,a,'-');
      }else{
        return join(new Date(),a,'-');
      }
  }

  var myCollapsible = document.getElementById('collapseExample')
  if(myCollapsible != null){
    myCollapsible.addEventListener('show.bs.collapse', function () {
      setTimeout(() => {
        myCollapsible.setAttribute("class","collapse hide")
      }, 3000);
    })
  }

  return (
    <div className={classes.root}>
        <div class=" mt-2 collapse fade" id="collapseExample">
          <Alert severity={message=="True"?"success":"error"}>{message=="True"?"Xóa thành công":"Xóa thất bại"}</Alert>
        </div>
        <div>
          <input type='text' onChange={props.tfSearchOnchage}>
          </input>
          <buton type='button' onClick={props.btnSearchOnclick}>Search</buton>
        </div>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{formatDate(row.date)}</TableCell>
                      <TableCell align="left">{row.available?"True":"False"}</TableCell>
                      <TableCell align="left">

                      <button class="btn btn-light" type="button" aria-haspopup="true" aria-expanded="false">
                            <Link to={'/admin/product/updateProduct/'+row.id}>
                                Detail
                            </Link>
                        </button>
                        <button 
                            onClick = { ()=>
                                {
                                  axios.delete(url+'/delete/'+row.id)
                                    .then(() =>{
                                        setMessage("True");
                                        props.setStatus(true);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        setMessage("False");
                                    })
                                }
                            } 
                            class="btn btn-danger" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                        >
                            Delete
                        </button>
                        
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        
    </div>
  );

}
export default Product;