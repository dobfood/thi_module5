import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from './compoment/index';
import Create from './compoment/create'
import Edit from './compoment/update.jsx'
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes >
      <Route path="" element={<Product/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
