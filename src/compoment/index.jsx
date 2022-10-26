import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Product() {
  
  const navigate = useNavigate();
  const [mess, setMess] = useState({
    status: "",
    mess: "",
  });
  const [state, setState] = useState([]);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const callApi = async () => {
    return await axios.get("http://localhost:3001/");
  };

  const handleDelete = async (id) => {
    let reqOptions = {
      url: `http://localhost:3001/products/${id}`,
      method: "DELETE",
    };

    if (window.confirm("Are U Sure?")) {
      await axios
        .request(reqOptions)
        .then((res) => {
          setMess({
            status: "success",
            mess: res.data.message,
          });
        })
        .catch((err) => {
          setMess({
            status: "error",
            mess: err.message,
          });
        });
    }
  };
  const handleUpdate=async(id)=>{
    navigate(`/edit/${id}`)
  }
  useEffect(() => {
    callApi()
      .then((res) => {
        setState(res.data);
      })
      .catch((e) => {
        throw e;
      });
  }, [handleDelete]);
  return (
    <>
      <Stack direction="row">
        <Link to="/create">
          <Button variant="outlined">Create</Button>
        </Link>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">{item.stock}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={()=>{
                    handleUpdate(item.id)
                  }}>Update</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Product;
