import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList/ProductList";
import ProductCurd from "./components/ProductCurd/ProductCurd";
import OrderList from "./components/OrderList/OrderList";
import OrderCreate1 from "./components/OrderCreate1/OrderCreate1";
import OrderCreate2 from "./components/OrderCreate2/OrderCreate2";
import OrderCreate3 from "./components/OrderCreate3/OrderCreate3";
import { ProductProvider } from "./components/productContext/ProductContext";

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<ProductCurd />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/orderCreate1" element={<OrderCreate1 />} />
        <Route path="/order-next1" element={<OrderCreate2 />} />
        <Route path="/order-next2" element={<OrderCreate3 />} />
      </Routes>
    </ProductProvider>
  );
}

export default App;
