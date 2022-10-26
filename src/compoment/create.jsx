import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Product from "./index"
function Create() {
  const [mess, setMess] = useState({
    status: '',
    mess: '',
});
  
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
});
const navigate = useNavigate();

const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value})
}
const handleSubmit = async (e) => {
    e.preventDefault();
    
    let data = {
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description
    }
    await axios.post('http://localhost:3001/products', data)
        .then(res => {
            console.log(res.data)
            setMess({
                status: 'success',
                mess: 'Tạo mới thành công! Về trang chủ...',
            });
            setTimeout(() => navigate('/'), 1000);
        })
        .catch(err => {
            console.log(err.message);

        });
}
  return (
    
    <>
    <Product/>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          required
          onChange={handleChange}
          value = {product.name}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          name="price"
          required
          onChange={handleChange}
          value = {product.price}
        />
        <TextField
          id="outlined-basic"
          label="Stock"
          variant="outlined"
          name="stock"
          required
          onChange={handleChange}
          value = {product.stock}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          name="description"
          required
          onChange={handleChange}
          value = {product.description}
        />
        <Stack direction="row">
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit} >
            Send
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Create;
